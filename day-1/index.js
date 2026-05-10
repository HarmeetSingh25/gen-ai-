import readline from "readline/promises";
import { invokeAI } from "./ai.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const message = [];

while (true) {
  const UserInput = await rl.question("you :");

  message.push({
    role: "user",
    content: UserInput,
  });

  const aiMessage = await invokeAI(message);
  message.push(aiMessage);
  console.log("User question:", UserInput);
  console.log("AI answer:", aiMessage);
}
