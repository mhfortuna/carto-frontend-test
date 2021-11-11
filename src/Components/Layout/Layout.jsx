import React from "react";

import Header from "../Header";
// import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <main className="h-full w-full">{children}</main>
      {/* <Footer  /> */}
    </div>
  );
}
