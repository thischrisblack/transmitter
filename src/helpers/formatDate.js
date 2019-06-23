const formatDate = dateObject => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  // let year = dateObject.getFullYear().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let day = dateObject.getDay();
  let date = dateObject.getDate().toString();
  let hours = dateObject.getHours().toString();
  let minutes = dateObject.getMinutes().toString();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  let dayDate = weekdays[day] + " " + month + "/" + date;
  let time = hours + ":" + minutes.padStart(2, "0");
  let dateTime = dayDate + " " + time + " " + ampm;
  return dateTime;
};

export default formatDate;
