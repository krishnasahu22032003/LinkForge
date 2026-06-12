import type { Request, Response } from "express";
import { SignUpSchema } from "../validatons/auth.schema.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import crypto from "crypto" ;
import { sendVerificationEmail } from "../services/email.service.js";

const SALT_ROUNDS = 12 ;

export async function UserSignUp(req : Request , res:Response){

const parsedData = SignUpSchema.safeParse(req.body);

if(!parsedData.success){
    return res.status(400).json({
        success:false ,
        message:"Invalid Input",
        error:parsedData.error.flatten()
    });
};

const {username , email , password} = parsedData.data ; 

try{
    
    const checkuser = await prisma.user.findUnique({
        where:{
            email
        }
    }) ;

    if(checkuser){
        
        return res.status(409).json({
            success:false ,
            message:"User with this email already exists"
        });
    };

    const hashedPassword  = await bcrypt.hash(password , SALT_ROUNDS) ;

    const user = await prisma.user.create({
        data:{
            email,
            password:hashedPassword , 
            username,
            emailVerified:false
        }
    });

    const token = crypto.randomUUID() ; 

   await prisma.verificationToken.create({
    data:{
        token ,
        userId:user.id,
        expiresAt:new Date(Date.now() + 1000 * 60 * 60 * 24),

    },
   });

   await sendVerificationEmail(user.email , token) ;

   return res.status(201).json({
    success:true ,
    message: "Verification email sent. Please verify your email.",
    data:{
        name : user.username,
        email:user.email
    },

   });

}catch(error){
console.error(error)
return res.status(500).json({
    success:false,
    message:"Internal server error"
});
};
}