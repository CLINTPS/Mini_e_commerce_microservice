import express,{Response,Request,NextFunction,Application} from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { dependencies } from "../config/dependencies";
import {addProduct} from "..//infrastructure/routes/addProduct"


dotenv.config();
const app:Application = express()
const PORT: number = Number(process.env.PORT || 4003);

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(addProduct(dependencies))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const errorResponse = {
      errors: [{ message: err?.message || 'Something went wrong' }],
    };
    return res.status(500).json(errorResponse);
  });
  

app.listen(PORT, () => {
    console.log(`Connected to product-service at port ${PORT}`) 
}) 

export default app;