import { Schema } from "mongoose";
import { producer } from '..';

export const userCreatedProducer = async (
    
    data:{
        _id:Schema.Types.ObjectId;
        username:string;
        email:string;
        password:string;
        role:string;
        isBlocked:Boolean;
    }
)=>{
    console.log("AddUser second location")
    try {
        // console.log("AddUser 3rd location")

        await producer.connect();
        if(data.role === "user" || data.role === "admin"){
        // console.log("AddUser 4th location")

            const message = {
                topic :'to-user',
                messages:[{
                    key:'userCreated',
                    value:JSON.stringify(data)
                }]
            };
            
            console.log("🚀 ~ file: userCreatedProducers.ts:30 ~ message:", message)
            await producer.send(message)
        // console.log("AddUser 5th location")
        }else{
            throw new Error("Role is undifined");
            
        }
    } catch (error:any) {
        console.error("Kafka auth produce error :",error?.message);
    }finally{
        await producer.disconnect();
    }
}