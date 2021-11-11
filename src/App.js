import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RouterComponent from "./components/Router";

function App() {
  return (
    <>
      <RouterComponent />
      {/* <div className="App"></div> */}
      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
