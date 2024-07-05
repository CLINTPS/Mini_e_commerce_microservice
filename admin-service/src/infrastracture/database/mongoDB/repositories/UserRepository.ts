import { User,UserData } from "../../../../domain/entities";
import { Admin } from "../models/loginSchema";
import bcrypt from 'bcrypt'


export const addUser = async (data:UserData):Promise<User | null >=>{
    try {
        if(!data.email || !data.username || !data.password){
            throw new Error("UserName,Email and Password are required");
        }
        if(data.username.trim()===""){
            throw new Error("UserName canot be empty");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {
            throw new Error("Invalid email format");
        }

        if(data.password.length < 8){
            throw new Error("Password must be at least 8 characters long");
        }
        const existingUser : User |null = await Admin.findOne({email:data.email})
        console.log("🚀 ~ file: UserRepository.ts:24 ~ addUser ~ existingUser:", existingUser)
        if(existingUser){
            throw new Error("Email already exists");
        }

        const hasedPassword = await bcrypt.hash(data.password,10)
        const newUser = new Admin({
            username:data.username,
            email:data.email,
            password:hasedPassword,
        })

        const savedUser = await newUser.save()
        console.log("🚀 ~ file: UserRepository.ts:36 ~ addUser ~ savedUser:", savedUser)
        return savedUser

    } catch (error:any) {
        throw new Error(error?.message);     
    }
}