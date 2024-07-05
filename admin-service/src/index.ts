import server from './presentation/server';
import dbConnection from './infrastracture/database/dbConnection';

(async ()=>{
    try {
        server;
        await dbConnection().catch((error:any)=>{
            console.error("Database connection error:", error.message);
            process.exit(1)
        })
    } catch (error:any) {
        console.error("Admin service failed",error.message);
        process.exit(1)
    }
})()