import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";
import dotenv from "dotenv"

dotenv.config()
const app=express()
const PORT=process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use("/auth",proxy("http://localhost:4001/"))
app.use("/admin",proxy("http://localhost:4002/"))
app.use("/product",proxy("http://localhost:4003/"))
app.use("/cart",proxy("http://localhost:4004/"))

app.listen(PORT, () => {
    console.log(`Gateway is Listening to Port : ${PORT}`);
  });
  