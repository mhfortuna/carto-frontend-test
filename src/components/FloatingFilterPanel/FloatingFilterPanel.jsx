import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import DateInput from "../DateInput/DateInput";
import filterPanelSchema from "./filter-panel-schema";

export default function FloatingFilterPanel({
  handleDateChange,
  datesState,
  loaded = true,
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formik = useFormik({
    initialValues: {
      startDate: datesState.startDate,
      endDate: datesState.endDate,
    },
    validationSchema: filterPanelSchema,
    onSubmit: async (filterPanelState) => {
      handleDateChange(filterPanelState);
    },
  });

  const classNames = !isMinimized
    ? "flex flex-col absolute right-4 top-4 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white select-none p-4 gap-y-2 xl:gap-y-4 z-30 w-80"
    : "flex flex-col absolute right-2 top-2 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white p-4 gap-y-2 xl:gap-y-4 z-30";

  return (
    <motion.form
      className={classNames}
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      transition={{
        x: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
        layout: { duration: 0.3 },
      }}
      layout
      onSubmit={formik.handleSubmit}
    >
      {!isMinimized ? (
        <>
          <p className="font-bold text-2xl">Filter earthquakes</p>
          <button
            className="p-0 ml-auto flex items-center justify-center rounded-md text-white absolute top-4 right-3"
            type="button"
            onClick={handleMinimize}
          >
            <FiMinimize2 size="1.5em" className="" />
          </button>
          <div>
            <DateInput
              placeholder="Pick start date"
              onChange={formik.handleChange}
              value={formik.values.startDate}
              onBlur={formik.handleBlur}
              id="startDate"
              hasErrorMessage
              errorMessage={formik.errors.startDate}
            />
          </div>
          <div>
            <DateInput
              placeholder="Pick end date"
              onChange={formik.handleChange}
              value={formik.values.endDate}
              onBlur={formik.handleBlur}
              id="endDate"
              hasErrorMessage
              errorMessage={formik.errors.endDate}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="w-1/2 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-75 p-2 text-white ml-auto"
              type="submit"
              disabled={!loaded}
            >
              {loaded ? (
                "Filter"
              ) : (
                <span
                  className="
      animate-spin
      rounded-full
      h-6
      w-6
      border-b-2 border-gray-100
    "
                />
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <button
            className="p-0 rounded-md text-white"
            type="button"
            onClick={handleMinimize}
          >
            <FiMaximize2 size="1.5em" className="" />
          </button>
        </div>
      )}
    </motion.form>
  );
}
