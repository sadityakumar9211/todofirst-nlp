function to12Hours(time24) {
  let hour = parseInt(time24);
  let minutes = time24?.slice(3, 5);
  if (hour == 12) {
    return `12:${minutes} PM`;
  } else if (hour == 0) {
    return `12:${minutes} AM`;
  } else if (hour < 12) {
    return hour + `:${minutes} AM`;
  } else {
    return hour - 12 + `:${minutes} PM`;
  }
}

export { to12Hours };
