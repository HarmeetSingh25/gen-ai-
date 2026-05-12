import { ChatMistralAI } from "@langchain/mistralai";
import {  createAgent} from "langchain";
import { config } from "../config/config";

const model = new ChatMistralAI({
  apiKey: config.MISTRAL_API_KEY,
  modelName: "mistral-medium-latest",
});

const agent = createAgent({
    model,
    tools:[]
})
