import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "../features/chat/state/chat.slice.js";
const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
export default store;
