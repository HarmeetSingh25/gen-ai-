import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
import { createAgent } from "langchain";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

const agent = createAgent({
  model,
  tools: [],
});

export async function genratedResponse(message) {
  let response = await model.stream(message);
  return response.content;
}

export async function getStream(messages) {
  const stream = await agent.stream(
    {
      messages,
    },
    {
      streamMode: "messages",
    },
  );
  console.log(stream , "ai.service");
  
  return stream;
}
