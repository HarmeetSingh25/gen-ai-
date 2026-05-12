import { getStream } from "../service/ai.service.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const handelMessage = async (req, res) => {
  const { message, conversationId } = req.body;

  let currentConversationId = conversationId;

  if (!currentConversationId) {
    const newConversation = await Conversation.create({
      title: message.slice(0, 20),
    });
    console.log(newConversation, "tets1");

    currentConversationId = newConversation._id;
  }

  await Message.create({
    conversationId: currentConversationId,
    role: "user",
    content: message,
  });

  const oldMessages = await Message.find({
    conversationId: currentConversationId,
  }).sort({ createdAt: 1 });

  const formattedMessages = oldMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const stream = await getStream(formattedMessages, message);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    for await (const chunk of stream) {
      console.log(chunk, "STREAM CHUNK");

      const aiChunk = chunk?.content || "";

      fullResponse += aiChunk;

      res.write(
        `data: ${JSON.stringify({
          chunk: aiChunk,
          conversationId: currentConversationId,
        })}\n\n`,
      );
    }

    console.log(fullResponse, "FULL RESPONSE");

    const savedAiMessage = await Message.create({
      conversationId: currentConversationId,
      role: "assistant",
      content: fullResponse,
    });

    console.log(savedAiMessage, "AI SAVED");
  } catch (err) {
    console.log(err, "STREAM ERROR");
  }
  res.end();
};

export const getConversations = async (req, res) => {
  const conversations = await Conversation.find().sort({ updatedAt: -1 });

  res.json(conversations);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  }).sort({ createdAt: 1 });

  res.json(messages);
};
