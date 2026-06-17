import type { Request, Response } from "express";
import { createShortUrlSchema } from "../validators/url.schema.js";
import { prisma } from "../lib/prisma.js";
import generateShortCode from "../lib/shortcode.js";
import ENV_SECRETS from "../lib/ENV.js";
import redis from "../lib/redis.js";


export async function CreateUrl(req: Request, res: Response) {
  const parsedData = createShortUrlSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid Input",
      error: parsedData.error.flatten(),
    });
  }

  const { url } = parsedData.data;

  try {
    // ==========================
    // Check Redis Cache
    // ==========================

    const cachedCode = await redis.get(`original:${url}`);

    if (cachedCode) {
      console.log("REDIS HIT");

      const existingUrl = await prisma.url.findUnique({
        where: {
          shortCode: cachedCode as string,
        },
      });

      if (existingUrl) {
        return res.status(200).json({
          success: true,
          message: "URL already exists",
          data: {
            id: existingUrl.id,
            originalUrl: existingUrl.originalUrl,
            shortCode: existingUrl.shortCode,
            shortUrl: `${ENV_SECRETS.BASE_URL}/api/v1/url/${existingUrl.shortCode}`,
            clicks: existingUrl.click,
            createdAt: existingUrl.createdAt,
            ownedByUser: !!existingUrl.userId,
          },
        });
      }
    }

    console.log("REDIS MISS");

    // ==========================
    // Check Database
    // ==========================

    const existingUrl = await prisma.url.findFirst({
      where: {
        originalUrl: url,
        userId: req.userId ?? null,
      },
    });

    if (existingUrl) {
      await Promise.all([
        redis.set(
          `original:${url}`,
          existingUrl.shortCode
        ),
        redis.set(
          `url:${existingUrl.shortCode}`,
          existingUrl.originalUrl
        ),
      ]);

      return res.status(200).json({
        success: true,
        message: "URL already exists",
        data: {
          id: existingUrl.id,
          originalUrl: existingUrl.originalUrl,
          shortCode: existingUrl.shortCode,
          shortUrl: `${ENV_SECRETS.BASE_URL}/api/v1/url/${existingUrl.shortCode}`,
          clicks: existingUrl.click,
          createdAt: existingUrl.createdAt,
          ownedByUser: !!existingUrl.userId,
        },
      });
    }

    // ==========================
    // Generate Unique Short Code
    // ==========================

    let code: string;
    let shortCodeExists;

    do {
      code = generateShortCode();

      shortCodeExists = await prisma.url.findUnique({
        where: {
          shortCode: code,
        },
      });
    } while (shortCodeExists);

    // ==========================
    // Create URL
    // ==========================

    const createUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode: code,
        userId: req.userId ?? null,
      },
    });

    // ==========================
    // Cache Mappings
    // ==========================

    await Promise.all([
      redis.set(
        `original:${url}`,
        createUrl.shortCode
      ),

      redis.set(
        `url:${createUrl.shortCode}`,
        createUrl.originalUrl
      ),
    ]);

    const shortLink =
      `${ENV_SECRETS.BASE_URL}/api/v1/url/${createUrl.shortCode}`;

    // ==========================
    // Return Response
    // ==========================

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      data: {
        id: createUrl.id,
        originalUrl: createUrl.originalUrl,
        shortCode: createUrl.shortCode,
        shortUrl: shortLink,
        clicks: createUrl.click,
        createdAt: createUrl.createdAt,
        ownedByUser: !!createUrl.userId,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function redirectUrl(req: Request, res: Response) {

  const { shortCode } = req.params;

if (!shortCode || Array.isArray(shortCode)) {
  return res.status(400).json({
    success: false,
    message: "Invalid short code",
  });
}

  try {
    const cachedUrl = await redis.get(`url:${shortCode}`);

    if (cachedUrl) {
      const url = await prisma.url.findUnique({
        where: {
          shortCode,
        },
        select: {
          id: true,
        },
      });

      if (url) {
        await prisma.$transaction([
          prisma.url.update({
            where: {
              id: url.id,
            },
            data: {
              click: {
                increment: 1,
              },
            },
          }),

          prisma.visit.create({
            data: {
              shortUrlId: url.id,
              ipAddress: req.ip || null,
              userAgent: req.get("user-agent") || null,
            },
          }),
        ]);
      }

      return res.redirect(cachedUrl as string);
    }

    const url = await prisma.url.findUnique({
      where: {
        shortCode,
      },
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    await redis.set(`url:${shortCode}`, url.originalUrl);

    await prisma.$transaction([
      prisma.url.update({
        where: {
          id: url.id,
        },
        data: {
          click: {
            increment: 1,
          },
        },
      }),

      prisma.visit.create({
        data: {
          shortUrlId: url.id,
          ipAddress: req.ip || null,
          userAgent: req.get("user-agent") || null,
        },
      }),
    ]);

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getUserUrls(req: Request, res: Response) {

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    };

    try {
        const urls = await prisma.url.findMany({
            where: {
                userId: req.userId
            },
            select: {
                id: true,
                originalUrl: true,
                shortCode: true,
                click: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"

            }
        });

        const formattedUrls = urls.map((url) => ({
            id: url.id,
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            shortUrl: `${ENV_SECRETS.BASE_URL}/api/v1/url/${url.shortCode}`,
            clicks: url.click, 
            createdAt: url.createdAt,
        }));

        return res.status(200).json({
            success: true,
            count: formattedUrls.length,
            data: formattedUrls,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

export async function deleteUrl(req: Request,res: Response) {

  try {
    const { id } = req.params;

    if (typeof id !== "string") {
  return res.status(400).json({
    success: false,
    message: "Invalid URL id",
  });
};

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this URL",
      });
    }
await Promise.all([
  redis.del(`url:${url.shortCode}`),
  redis.del(`original:${url.originalUrl}`)
]);

    await prisma.url.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  };
};

export async function getUrlAnalytics(req: Request, res: Response) {
  try {

    const { id } = req.params;

    if (!id || Array.isArray(id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid URL id",
  });
}

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const visits = await prisma.visit.findMany({
      where: {
        shortUrlId: url.id,
      },
      orderBy: {
        visitedAt: "desc",
      },
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        visitedAt: true,
      },
    });

    const uniqueVisitors = new Set(
      visits.map((visit) => visit.ipAddress).filter(Boolean)
    ).size;

    return res.status(200).json({
      success: true,
      data: {
        urlId: url.id,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        totalClicks: url.click,
        totalVisits: visits.length,
        uniqueVisitors,
        lastVisited: visits[0]?.visitedAt ?? null,
        visits,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getDashboardStats( req: Request,res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const totalUrls = await prisma.url.count({
      where: {
        userId: req.userId,
      },
    });

    const clickStats = await prisma.url.aggregate({
      where: {
        userId: req.userId,
      },
      _sum: {
        click: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        totalUrls,
        totalClicks:
          clickStats._sum.click ?? 0,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  };
};