import { IUseCases } from './IUsecases'
import { IRepositories } from './IRepositories'

export interface IDependencies{
    repositories:IRepositories;
    useCases:IUseCases;
}