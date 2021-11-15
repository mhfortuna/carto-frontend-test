import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import Header from "../Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <AnimatePresence>
        <motion.main
          className="h-full w-full relative"
          initial={{
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
