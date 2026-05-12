import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import morgan from "morgan";

const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cookieParser())

app.get("/" , (req,res)=>{
res.send("Hello world");
    
})

export default app
