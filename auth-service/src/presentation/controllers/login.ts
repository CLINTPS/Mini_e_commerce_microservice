import e, { NextFunction,Request,Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import genJwtToken from "../../util/jwt/genJwtToken"
import { UserEntity } from "../../domain/entities"

export const loginController = (dependencies:IDependencies)=>{
    const {useCases : {loginUserUseCase}}=dependencies;
    return async (
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try {
            const userCredentials=req.body
            // console.log("🚀 ~ file: login.ts:15 ~ loginController ~ userCredentials:", userCredentials)

            const {email,password} = req.body;
            if(!email || !password){
                res.status(400).json({success:false,message:"Email and password are required"});
                return;
            }
            
            const user:UserEntity | null = await loginUserUseCase (dependencies).execute(userCredentials)
            // console.log("🚀 ~ file: login.ts:24 ~ loginController ~ user:", user)

            if(user){
                const userId:string = user._id?.toString() ?? "";
                const token=genJwtToken({
                    userId:userId,
                    userEmail:user.email,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked
                })
                res.cookie("auth",token,{
                    maxAge:1000*60*60*24,
                    httpOnly:true
                })
                res.status(200).json({ success: true, data: user, message: "Login successful" });
            } else {
                res.status(401).json({ success: false, message: "Invalid email or password" });
            }


        } catch (error) {
            next(error)
        }
    }
}