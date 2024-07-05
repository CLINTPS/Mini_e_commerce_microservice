import { AdminLoginRequest } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const loginAdminUseCase =(dependencies:IDependencies)=>{
    const {repositories:{login}} =dependencies;
    return {
        execute:async(data:AdminLoginRequest)=>{
            try {
                return await login(data)
            } catch (error : any) {
                throw new Error(error?.message)
            }
        }
    }
}