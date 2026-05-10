import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        messages:[]
    },
    reducers:{
        addmessage:(state , action)=>{
            state.messages.push(action.payload)

            
            
        },
         setMessages: (state, action) => {
         state.messages = action.payload;
      },
         appendContentToLastMessage:(state , action)=>{
state.messages[state.messages.length-1].content+= action.payload.chunk




}

}

})

export const {addmessage ,setMessages, appendContentToLastMessage}= chatSlice.actions
export default chatSlice.reducer