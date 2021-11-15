import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./components/Router";

function App() {
  return (
    <>
      <RouterComponent />
      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
