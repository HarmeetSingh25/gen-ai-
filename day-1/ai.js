import { Mistral } from "@mistralai/mistralai";
import { ChatMistralAI } from "@langchain/mistralai";
import {createAgent  } from "langchain";
import { latestinformationTool } from "./tool.js";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.MISTRAL_API_KEY || "your_api_key";


const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey:apiKey

})

// console.log("APIKEY",apiKey);
const agent = createAgent({
    model: model,
    tools: [
        latestinformationTool
    ],

})


export async function invokeAI (message){
   const response = await agent.invoke({
        messages: message
    });
    return response.messages[response.messages.length - 1].content;
}


// const client = new Mistral({ apiKey: apiKey });
// export async function invokeAI (message){
//   const chatResponse = await client.chat.complete({
//   model: "mistral-medium-latest",
//   messages: [],
// });
// return chatResponse.choices[0].message
// }