import { useDispatch } from "react-redux";

import { addmessage, appendContentToLastMessage } from "../state/chat.slice.js";

import { sendMessage } from "../service/chat.api";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handelsendmessage(userInput, conversationId) {
    // USER MESSAGE
    dispatch(
      addmessage({
        role: "user",
        content: userInput,
        timestamp: Date.now(),
      }),
    );

    // EMPTY AI MESSAGE
    dispatch(
      addmessage({
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      }),
    );

    // STREAM AI RESPONSE
    sendMessage(
      userInput,
      conversationId,

      ({ chunk, conversationId }) => {
        dispatch(appendContentToLastMessage({chunk}));
      },
    );
  }

  return {
    handelsendmessage,
  };
};
