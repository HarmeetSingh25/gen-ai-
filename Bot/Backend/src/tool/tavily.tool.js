import { tavily } from "@tavily/core";

import { config } from "../config/config.js";

const tvly = tavily({
   apiKey: config.TAVILY_API_KEY,
});

export const tavilyTool = async (
   query
) => {

   const response =
      await tvly.search(query, {
         search_depth: "advanced",
         max_results: 5,
      });

   return response.results;
};