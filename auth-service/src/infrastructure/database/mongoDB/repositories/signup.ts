import { User } from "../models/loginCredentials";
import { UserEntity } from "../../../../domain/entities";

export const signup = async (
    data:UserEntity
):Promise<UserEntity | null >=>{
    try {
        console.log("User sign up infra,databa,mongodb,reposi,sign");
        const newUser = await User.create(data)
        console.log("🚀 ~ file: signup.ts:10 ~ newUser:", newUser)
        if(!newUser){
           throw new Error("New User account creation faild") 
        }
        return newUser as UserEntity;
    } catch (error:any) {
       throw new Error(error?.message) 
    }
}