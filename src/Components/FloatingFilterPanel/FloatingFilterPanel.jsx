import React from "react";
import { motion } from "framer-motion";
import DateInput from "../DateInput/DateInput";

export default function FloatingFilterPanel({
  handleDateChange,
  datesState,
  loaded = true,
}) {
  const handleChange = (event) => {
    handleDateChange({ ...datesState, [event.target.id]: event.target.value });
  };

  return (
    <motion.div
      className="flex flex-col absolute right-2 top-2 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white p-4 gap-y-4 w-80 z-30"
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-bold text-2xl">Filter earthquakes</p>
      <div>
        <DateInput
          placeholder="Pick start date"
          onChange={handleChange}
          id="startDate"
          value={datesState.startDate}
        />
      </div>
      <div>
        <DateInput
          placeholder="Pick end date"
          onChange={handleChange}
          id="endDate"
          value={datesState.endDate}
        />
      </div>
      <div className="flex justify-center items-center">
        {!loaded ? (
          <div
            className="
      animate-spin
      rounded-full
      h-10
      w-10
      border-b-2 border-gray-100
    "
          />
        ) : (
          <div
            className="
      h-10
      w-10
    "
          />
        )}
      </div>
    </motion.div>
  );
}
