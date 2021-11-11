import React from "react";
import DateInput from "../DateInput/DateInput";

export default function FloatingPanel({ handleDateChange, datesState }) {
  const handleChange = (event) => {
    handleDateChange({ ...datesState, [event.target.id]: event.target.value });
  };

  return (
    <div className="flex flex-col absolute right-2 top-2 rounded-lg overflow-hidden bg-pink-800	bg-opacity-75 text-white p-3 gap-y-4">
      Floating panel
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
    </div>
  );
}
