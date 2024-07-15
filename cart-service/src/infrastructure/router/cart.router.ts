import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const cartRoutes=(dependencies:IDependencies)=>{
const {users,getCart} = controllers(dependencies)
    const router=Router();

    router.route("/addtocart").post(users)
    router.route("/getcart/:id").get(getCart)

    return router;
}

// alredy adding user ID : 66877526b74a44ca9167f06f

// new user arjun ID/: 66877552b74a44ca9167f075
// new product boat rockers ID : 6687818095f307fa6b58f454