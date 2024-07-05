import { hash, genSalt } from 'bcrypt'

export const hashPassword = async (password:string)=>{
    try {
        const hashedPass=await hash(password,await genSalt(10))
        if(!hashedPass){
            throw new Error("Password is not Hashed")
        }
        return hashedPass;
    } catch (error:any) {
        throw new Error(error.message)
    }
}