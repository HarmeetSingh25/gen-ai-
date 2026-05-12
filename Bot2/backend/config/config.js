import { config } from "dotenv";
config()
export const config = {
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  MONGO_URI:process.env.MONGO_URI
};
