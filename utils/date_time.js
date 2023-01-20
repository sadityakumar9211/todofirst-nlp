const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[new Date().getDay()];
const date = new Date().getDate();
const time = new Date().toLocaleTimeString().slice(0, 5);

export { day, date, time };
