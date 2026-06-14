import type { Request, Response } from "express";
import { createShortUrlSchema } from "../validatons/url.schema.js";
import { prisma } from "../lib/prisma.js";
import generateShortCode from "../lib/shortcode.js";
import ENV_SECRETS from "../lib/ENV.js";


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

        const code = generateShortCode();

        const createUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortCode: code,
                userId: req.userId ?? null,
            }
        });

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

    }catch(error){
        console.error(error) ;
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    };
};