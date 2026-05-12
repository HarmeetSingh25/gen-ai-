export const shouldSearch = (
   query
) => {

   const keywords = [
      "today",
      "latest",
      "news",
      "current",
      "weather",
      "stock",
      "price",
      "2026",
      "live",
      "recent",
      "update"
   ];

   return keywords.some((word) =>
      query.toLowerCase().includes(word)
   );
};