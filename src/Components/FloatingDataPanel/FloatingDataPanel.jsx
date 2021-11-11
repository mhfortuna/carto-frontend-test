import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";

export default function FloatingDataPanel({
  earthquakeDetails,
  setEarthquakeDetails,
}) {
  const handleClose = () => {
    setEarthquakeDetails(null);
  };
  return (
    <AnimatePresence>
      {earthquakeDetails && (
        <motion.div
          className="flex flex-col absolute right-2 bottom-2 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white p-4 gap-y-4 w-80"
          initial={{ x: 600 }}
          animate={{ x: 0 }}
          exit={{ x: 600 }}
          transition={{ duration: 0.5 }}
        >
          {/* <div className="flex flex-row"> */}
          <p className="font-light text-2xl">Earthquake details:</p>
          <button
            className="p-0 ml-auto flex items-center justify-center rounded-md text-white absolute top-3 right-3"
            type="button"
            onClick={handleClose}
          >
            <MdClose size="1.5em" className="" />
          </button>
          {/* </div> */}
          <div className="">
            <p className="font-medium mb-0">Location:</p>
            <p className="text-lg break-normal">
              {earthquakeDetails.properties.place}
            </p>
          </div>
          <div>
            <p className="font-medium mb-0">ID:</p>
            <p className="text-lg break-normal">{earthquakeDetails.id}</p>
          </div>
          <button
            className="w-1/2 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-75 p-2 text-white ml-auto"
            type="button"
          >
            See details
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
