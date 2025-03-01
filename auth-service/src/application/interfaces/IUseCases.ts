import { IFindUserByEmailUseCase, ILoginUserUseCase, ISignupUserUseCase } from "../../domain/useCaseInterface";
import {IDependencies} from './IDependencies'

export interface IUseCases {
    signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
    loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
    findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;
}