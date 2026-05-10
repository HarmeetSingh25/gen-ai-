import React, { useEffect, useState } from 'react'
import { useChat } from '../hooks/useChat.js'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, getMessages } from '../service/chat.api.js'
import { setMessages } from '../state/chat.slice.js';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const chat = () => {
    let dispatch = useDispatch()
    const [conversationId, setConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);

    const handleSelect = async (id) => {

        setConversationId(id);

        const oldMessages = await getMessages(id);

        dispatch(setMessages(oldMessages));
    };

    const [input, setinput] = useState("")
    const messages = useSelector(store => store?.chat?.messages)
    const { handelsendmessage } = useChat()
    const handelsubmit = async () => {
        await handelsendmessage(input, conversationId)
        console.log(messages);

    }

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await handelsubmit();
        }
    };

    useEffect(() => {

        async function loadConversations() {

            const data = await getConversations();

            setConversations(data);
        }

        loadConversations();

    }, []);

    return (
        <div className="h-screen bg-zinc-950 text-white flex overflow-hidden">

            {/* SIDEBAR */}
            <div className="w-[280px] border-r border-zinc-800 flex flex-col bg-zinc-900">

                {/* Logo/Header */}
                <div className="p-4 border-b border-zinc-800">
                    <h1 className="text-xl font-bold">GenAI Chat</h1>
                </div>

                {/* New Chat Button */}
                <div className="p-4">
                    <button
                        onClick={() => {

                            setConversationId(null);

                            dispatch(setMessages([]));

                        }}
                    >
                        + New Chat
                    </button>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-2">

                    {conversations.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => handleSelect(chat._id)}
                            className={`p-3 rounded-xl cursor-pointer transition hover:bg-zinc-800 ${conversationId === chat._id
                                ? "bg-zinc-800"
                                : ""
                                }`}
                        >
                            <p className="truncate text-sm">
                                {chat.title}
                            </p>
                        </div>
                    ))}

                </div>
            </div>

            {/* CHAT SECTION */}
            <div className="flex-1 flex flex-col">

                {/* TOP BAR */}
                <div className="border-b border-zinc-800 p-4">
                    <h2 className="text-lg font-semibold">
                        AI Assistant
                    </h2>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                    {messages?.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                    ? "bg-blue-600 text-white rounded-br-md"
                                    : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                </div>

                {/* INPUT */}
                <div className="border-t border-zinc-800 p-4 bg-zinc-950">

                    <div className="flex gap-3">

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <button
                            onClick={handelsubmit}
                            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-medium"
                        >
                            Send
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default chat