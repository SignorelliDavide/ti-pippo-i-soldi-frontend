import './App.css'
import React from 'react';
import router from './navigation/router'
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    //<React.StrictMode>
    <RouterProvider router={router} />
    //</React.StrictMode >
  )
}

export default App
