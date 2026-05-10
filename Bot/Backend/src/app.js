import express, { urlencoded } from "express";
import chatRoutes from "../src/routes/app.route.js";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
// import { config } from "./config/config.js";

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/chat" , chatRoutes )

export default app;

// console.log(config.JWT_SECRET);

