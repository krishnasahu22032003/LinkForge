import type { Request, Response } from "express";
import { createShortUrlSchema } from "../validatons/url.schema.js";
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
            error: parsedData.error.flatten()
        });
    };

    const { url } = parsedData.data;

    try {

        let code;
        let existing;

        do {
            code = generateShortCode();

            existing = await prisma.url.findUnique({
                where: {
                    shortCode: code,
                },
            });
        } while (existing);

        const createUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortCode: code,
                userId: req.userId ?? null,
            }
        });

        await redis.set(
            `url:${createUrl.shortCode}`,
            createUrl.originalUrl)

        const ShortLink = `${ENV_SECRETS.BASE_URL}/${createUrl.shortCode}`;

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: {
                id: createUrl.id,
                originalUrl: createUrl.originalUrl,
                shortCode: createUrl.shortCode,
                shortUrl: ShortLink,
                clicks: createUrl.click,
                createdAt: createUrl.createdAt,
                ownedByUser: !!createUrl.userId,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    };
};

export async function redirectUrl(req: Request, res: Response) {

    const { shortCode } = req.params;

    if (typeof shortCode !== "string") {
        return res.status(400).json({
            message: "Invalid short code",
        });
    };

    try {

        const cachedUrl = await redis.get(`url:${shortCode}`);

        if (cachedUrl) {
            await prisma.url.update({
                where: {
                    shortCode,
                },
                data: {
                    click: {
                        increment: 1,
                    },
                },
            });

            return res.redirect(cachedUrl as string);
        };

        const url = await prisma.url.findUnique({
            where: {
                shortCode
            }
        });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        };

        await redis.set(`url:${shortCode}`, url.originalUrl);

        await prisma.url.update({
            where: {
                id: url.id,
            },
            data: {
                click: {
                    increment: 1,
                },
            },
        });

        return res.redirect(url.originalUrl);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};