import { consumer } from '.'
import { createSubscribe } from './subscriber'
import { stopConsumer } from './stopConsumer'

export const runConsumer =async()=>{
    try {
        console.log("Kafka runConsumer reached");
        
        await consumer.connect();
        await consumer.subscribe({ topic:'to-user',fromBeginning:true })
        await consumer.subscribe({ topic:'product',fromBeginning:true })

        const subscriber:any = createSubscribe();
        // console.log("🚀 ~ file: consumer.ts:14 ~ runConsumer ~ subscriber:", subscriber)

        await consumer.run({
            
            eachMessage:async({message})=>{
                console.log("Kafka runConsumer 2nd reached");
                const {key,value}=message;
                console.log("🚀 ~ file: consumer.ts:16 ~ eachMessage:async ~ key,value:", key,value)
                const subscriberMethod = String(key)
                console.log("🚀 ~ file: consumer.ts:18 ~ eachMessage:async ~ subscriberMethod:", subscriberMethod)
                const subscriberData =JSON.parse(String(value))
                console.log("🚀 ~ file: consumer.ts:17 ~ eachMessage:async ~ subscriberData:", subscriberData)

                try {
                    await subscriber [subscriberMethod](subscriberData)
                } catch (error:any) {
                    console.error("Cosumer processing error");
                    throw new Error(error?.message);
                    await stopConsumer();
                }
            }
        })



    } catch (error:any) {
        console.error('Consumer error:', error.message);
        throw new Error(error?.message) 
    }
}