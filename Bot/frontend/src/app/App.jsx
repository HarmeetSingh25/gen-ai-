import React from 'react'
import { Provider, useSelector } from "react-redux";
import store from "./app.store.js";
import { RouterProvider } from "react-router";
import Route from "./app.route.jsx";
import "./App.css";

const App = () => {
  
  
  return (
    <div>
      <Provider store={store}>

        <RouterProvider router={Route} />
      </Provider>
    </div>
  )
}

export default App