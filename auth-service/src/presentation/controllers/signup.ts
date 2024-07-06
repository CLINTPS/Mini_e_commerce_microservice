import { NextFunction,Request,Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { hashPassword } from "../../util/bcrypt/passwordHash"
import genJwtToken from "../../util/jwt/genJwtToken"
import { signupValidation } from "../../util/validations/signupValidation"
import { userCreatedProducer } from "../../infrastructure/kafka/producers/userCreatedProducers"

export const signupController = (dependencies:IDependencies)=>{
    const {
        useCases: {signupUserUseCase,findUserByEmailUseCase},
    } = dependencies;
    return async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            // const credentials=req.body
            // console.log("🚀 ~ file: signup.ts:17 ~ signupController ~ credentials:", credentials)
            const {value,error}=signupValidation.validate(req.body)
            if(error){
                res.status(400).json({success:false,message:error?.message})
            }

            if(!value.username || !value.username.trim()){
                res.status(400).json({success:false, message: "Username cannot be empty"});
                return;
            }

            if(!value.email || !value.password){
                res.status(400).json({success:false, message:"Email and password are required"});
                return;
            }

            try {
                const existingUser = await findUserByEmailUseCase(dependencies).execute(value.email);
                // console.log("🚀 ~ file: signup.ts:37 ~ signupController ~ existingUser:", existingUser)

                if(existingUser){
                    res.status(400).json({success:false, message:"Email alredy exist"});
                    return;
                }

            } catch (error) {
                console.error("Error findinig by user email",error);
            }

            const hashedPassword:string|null =await hashPassword(value.password);
            value.password=hashedPassword;

            const user = await signupUserUseCase(dependencies).execute(value);
            console.log("🚀 ~ file: signup.ts:58 ~ signupController ~ user:", user)

            if(user){
                const userId:string=user._id?.toString()?? "";
                const token=genJwtToken({
                    userId:userId,
                    userEmail:user.email,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked,
                });

                res.cookie("auth",token,{
                    maxAge:1000*60*60*24,
                    httpOnly:true,
                })

                res.status(201).json({success:true, data:user, message:"New User Created.."})

                const addedUser = {
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    password:user.password,
                    role:user.role,
                    isBlocked:user.isBlocked,
                    isAdmin:user.isAdmin
                };
                console.log("🚀 ~ file: signup.ts:88 ~ return ~ addedUser:", addedUser)
                if(addedUser){
                    console.log("addedUser located");
                    userCreatedProducer(addedUser)
                }

            }else{
                res.status(400).json({success:false,message:"User not found"});
            }

        } catch (error) {
            console.error(error);
            
        }
    }
}