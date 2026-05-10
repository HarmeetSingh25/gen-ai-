import { createBrowserRouter } from "react-router";
import Chat from "../features/chat/pages/chat.jsx";

const Route = createBrowserRouter([
    {
        path: "/",
        element: <Chat />
    }
])

export default Route