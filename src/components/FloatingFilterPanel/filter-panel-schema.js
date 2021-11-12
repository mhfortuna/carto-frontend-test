import * as Yup from "yup";

const currentDate = new Date();
const minDate = new Date("1950-01-01");

const filterPanelSchema = Yup.object().shape({
  startDate: Yup.date("Not a valid date")
    .required("The start date is required")
    .min(minDate, "The start date must be after 1950-01-01")
    .max(currentDate, "The end date cannot be in the future"),
  endDate: Yup.date("Not a valid date")
    .required("The end date is required")
    .max(currentDate, "The end date cannot be in the future")
    .min(minDate, "The start date must be after 1950-01-01")
    .when(
      "startDate",
      (startDate, schema) => startDate && schema.min(startDate),
      "End date must be after start date",
    ),
});

export default filterPanelSchema;
