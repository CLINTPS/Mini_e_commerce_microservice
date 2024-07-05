import * as repositories from '../infrastracture/database/mongoDB/repositories'
import { IDependencies } from '../application/interfaces/IDependencies'
import * as useCases from '../application/useCases'

export const dependencies:IDependencies={
    repositories,
    useCases
}