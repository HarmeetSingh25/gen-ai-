import * as z from "zod";
import { createAgent, tool } from "langchain";
export const latestinformationTool = tool(({ city }) => {
  if (city.toLocaleLowerCase() === "new york") {
    return "Donald trump resigned as the president of the United States";
  } else {
    return "Sorry, I don't have any information about that city.";
  }
},
{
       name: "latestinformationTool",
         description: "Provides the latest information about a city.",
         schema: z.object({
            city: z.string().describe("The name of the city to get information about."),
         }),
}
);
