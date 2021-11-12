import React from "react";

export default function DateInput({ placeholder, id, ...props }) {
  return (
    <div>
      <label className="text-gray-200 font-normal">{placeholder}</label>
      <input
        type="date"
        className="w-full
                pl-4
                pr-10
                py-3
                leading-none
                rounded-lg
                shadow-sm
                focus:outline-none focus:shadow-outline
                text-gray-600
                font-medium"
        id={id}
        name={id}
        // placeholder={placeholder}
        // onChange={onHandleChange}
        // onBlur={handleBlur}
        // onInput={handleInput}
        {...props}
      />
    </div>
  );
}
