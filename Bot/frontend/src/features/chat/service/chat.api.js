export async function sendMessage(
   message,
   conversationId,
   onChunk = () => {}
) {

   let response = await fetch(
      "/api/chat/message",
      {
         method: "POST",

         headers: {
            "Content-Type": "application/json",
         },

         body: JSON.stringify({
            message,
            conversationId
         }),
      }
   );

   const decoded = new TextDecoder();

   for await (const chunk of response.body) {

      const text = decoded.decode(chunk);

      const lines = text.split("\n\n");

      for (const line of lines) {

         if (line.startsWith("data: ")) {

            const jsonStr = line.replace(
               "data: ",
               ""
            );

            const data = JSON.parse(jsonStr);

            onChunk(data);
         }
      }
   }
}

export async function getConversations() {

   const res = await fetch(
      "/api/chat/conversations"
   );

   return res.json();
}

export async function getMessages(
   conversationId
) {

   const res = await fetch(
      `/api/chat/messages/${conversationId}`
   );

   return res.json();
}