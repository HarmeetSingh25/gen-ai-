import dotenv from "dotenv"
dotenv.config()
export const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET :process.env.JWT_SECRET,
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY,
    TAVILY_API_KEY:process.env.TAVILY_API_KEY
}
