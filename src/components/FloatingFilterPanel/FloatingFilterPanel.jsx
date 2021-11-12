import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import DateInput from "../DateInput/DateInput";
import filterPanelSchema from "./filter-panel-schema";

export default function FloatingFilterPanel({
  handleDateChange,
  datesState,
  loaded = true,
}) {
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

  return (
    <motion.form
      className="flex flex-col absolute right-2 top-2 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white p-4 gap-y-4 w-80 z-30"
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={formik.handleSubmit}
    >
      <p className="font-bold text-2xl">Filter earthquakes</p>
      <div>
        <DateInput
          placeholder="Pick start date"
          onChange={formik.handleChange}
          value={formik.values.startDate}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
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
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
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
    </motion.form>
  );
}
