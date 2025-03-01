import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";

export const findUserByEmailUseCase = (dependencies:IDependencies)=>{
    const { repositories:{findByEmail}}=dependencies;

    return {
        execute : async (email:string):Promise<UserEntity | null> => {
            return await findByEmail(email);
        }
    }
}