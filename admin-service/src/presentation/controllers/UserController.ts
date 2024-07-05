import e, { NextFunction,Response,Request } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { User } from "../../domain/entities";

export const addUserController = (dependencies:IDependencies)=>{
    const{ useCases:{addUserUseCase}}= dependencies;
    console.log("🚀 ~ file: UserController.ts:7 ~ addUserController ~ dependencies:", dependencies)
    if(!addUserUseCase){
        throw new Error("AddUserUseCaases is not defined in dependencieas");
    }
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const userData :User = req.body;
            console.log("🚀 ~ file: UserController.ts:14 ~ returnasync ~ userData:", userData)
            const addedUser:User | null=await addUserUseCase(dependencies).execute(userData);
            console.log("🚀 ~ file: UserController.ts:16 ~ returnasync ~ addedUser:", addedUser)
            res.status(201).json({addedUser})
        } catch (error:any) {
            console.error(error);
            next(error)
        }
    }
    
}