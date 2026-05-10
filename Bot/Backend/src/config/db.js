import mongoose from "mongoose"
import { config } from "./config.js"

export const connectoDb = async()=>{
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("server is connect to db ");
        
        
    } catch (error) {
        console.log("db error");
        
    }
}