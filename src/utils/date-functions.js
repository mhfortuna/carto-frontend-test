export const milisecondsToDate = (miliseconds) => {
  const date = new Date(miliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
