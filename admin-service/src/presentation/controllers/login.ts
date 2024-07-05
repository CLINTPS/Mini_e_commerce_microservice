import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { AdminEntity } from "../../domain/entities";
import jwt from 'jsonwebtoken';

export const loginController = (dependencies:IDependencies)=>{
    const {useCases:{loginAdminUseCase}}=dependencies;
    const loginAdmin = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const adminCredentials = req.body;
            const admin:AdminEntity | null = await loginAdminUseCase(dependencies).execute(adminCredentials)
            if(admin){
                if(admin.role === 'admin'){
                    let payload ={
                        _id:String(admin?._id),
                        email:admin?.email!,
                        role:admin?.role!
                    };
                    const accessToken=jwt.sign(payload,String(process.env.JWT_ACCESS_TOKEN_SECRET),{expiresIn:"1h"})
                    res.cookie("User_JWT",accessToken,{
                        httpOnly:true,
                    })
                    res.status(200).json({
                        success:true,
                        user:admin,
                        message:"Admin verification success"
                    })
                }else{
                    res.status(400).json({error:"Admin unautherized and insuficent role privileges"})
                }
            }else{
                res.status(400).json({error:"Admin unautherized"})
            }
        } catch (error:any) {
            console.error(error);
            next(error)
        }
    }
    return loginAdmin
}