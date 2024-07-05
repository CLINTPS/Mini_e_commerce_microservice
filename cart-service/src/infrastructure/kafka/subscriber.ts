import userCreatedConsumers from "./consumers/userCreatedConsumers";
import productCreatedConsumer from "./consumers/productCreatedConsumer";

export const createSubscribe= ()=>{
    return{
        userCreated:userCreatedConsumers,
        productCreated:productCreatedConsumer
    }
}