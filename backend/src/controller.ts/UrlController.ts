import type { Request , Response } from "express";
import { createShortUrlSchema } from "../validatons/url.schema.js";
import { parse } from "node:path";


export async function CreateUrl(req: Request , res:Response){

const parsedData = createShortUrlSchema.safeParse(req.body) ;

if(!parsedData.success){
    return res.status(400).json({
        success:false,
        message:"Invalid Input",
        error:parsedData.error.flatten()
    });
};




};