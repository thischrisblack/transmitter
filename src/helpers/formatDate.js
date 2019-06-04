const formatDate = dateObject => {

  let date = dateObject.getFullYear()+'-'+(dateObject.getMonth()+1)+'-'+dateObject.getDate();
  let time = dateObject.getHours() + ":" + dateObject.getMinutes() + ":" + dateObject.getSeconds();
  let dateTime = date+' '+time;
  return dateTime;
}

export default formatDate;