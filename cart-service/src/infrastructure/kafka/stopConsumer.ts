import { consumer } from ".";


export const stopConsumer=async()=>{
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log("Consumer Stoped");
        
    } catch (error:any) {
        console.error("Consumer stoping error......");
        throw new Error(error?.message);
    }
}