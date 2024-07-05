import { AdminEntity,AdminLoginRequest } from "../entities";

export interface loginAdminUseCase{
    execute(credentials:AdminLoginRequest):Promise<AdminEntity | null>;
}