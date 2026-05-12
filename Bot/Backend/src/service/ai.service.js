import { ChatMistralAI } from "@langchain/mistralai";

import { config } from "../config/config.js";

import { tavilyTool } from "../tool/tavily.tool.js";

import { shouldSearch } from "../utils/shouldSearch.js";

import { SYSTEM_PROMPT } from "../prompts/system.prompt.js";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

export async function getStream(messages, latestMessage) {
  let internetContext = "";

  if (shouldSearch(latestMessage)) {
    const results = await tavilyTool(latestMessage);

    internetContext = results
      .map(
        (item) => `
Title: ${item.title}

Content: ${item.content}

URL: ${item.url}
`,
      )
      .join("\n\n");
  }

  const finalMessages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },

    {
      role: "system",
      content: `
Realtime internet data:

${internetContext}
`,
    },

    ...messages,
  ];

  const stream = await model.stream(finalMessages);

  return stream;
}
