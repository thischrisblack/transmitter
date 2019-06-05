const formatDate = dateObject => {

  let year = dateObject.getFullYear().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let day = dateObject.getDate().toString();
  let hours = dateObject.getHours().toString();
  let minutes = dateObject.getMinutes().toString();
  let seconds = dateObject.getSeconds().toString();

  let date = year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0');
  let time = hours.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  let dateTime = date + ' ' + time;
  return dateTime;
}

export default formatDate;

// console.log(formatDate(new Date))

// console.log(new Date('2019-06-05 11:49:43'));