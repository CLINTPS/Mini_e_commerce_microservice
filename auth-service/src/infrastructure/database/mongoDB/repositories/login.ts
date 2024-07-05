import { User } from "../models/loginCredentials";
import { UserEntity } from "../../../../domain/entities";
import { UserLoginEntity } from "../../../../domain/entities";
import bcrypt from 'bcrypt'

export const login=async(data:UserLoginEntity):Promise<UserEntity | null> => {
    // console.log("🚀 ~ file: login.ts:7 ~ login ~ data:", data)
    try {
        console.log("Data :",data);
        const user :UserEntity | null = await User.findOne({email:data.email})
        // console.log("🚀 ~ file: login.ts:10 ~ login ~ user:", user)
        if(user){
            const isMathch : boolean = await bcrypt.compare(data.password,user.password)
            // console.log("🚀 ~ file: login.ts:13 ~ login ~ isMathch:", isMathch)
            if(!isMathch){
                throw new Error("UserName or UserPassword is incorrect")
            }else{
                return user as UserEntity
            }
        }else{
            throw new Error("User not found")
        }
        
    } catch (error:any) {
        throw new Error(error?.message)
    }
}