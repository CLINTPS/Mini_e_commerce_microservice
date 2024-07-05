import { IDependencies } from "../../application/interfaces/IDependencies";
import {addToCartController} from './addToCart'
import {getCart} from './getCart'

export const controllers=(dependencies:IDependencies)=>{
    return{
        users:addToCartController(dependencies),
        getCart:getCart(dependencies)
    }
};
