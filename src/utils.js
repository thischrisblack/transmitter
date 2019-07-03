/**
 * RESIZE IMAGE
 * @param {event} event
 */
export const resizeImage = event => {
  let imageStyle = event.currentTarget.style;
  imageStyle.width = imageStyle.width === "100%" ? "20rem" : "100%";
};

/**
 * Aspect Ratio Calculator
 * Learned at https://simon-schraeder.de/posts/filereader-async/
 * @param {*} file
 */
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      var img = new Image();
      img.src = e.target.result;

      img.onload = function() {
        let w = this.width;
        let h = this.height;
        resolve(h / w);
      };
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export async function aspectRatioCalculator(file) {
  try {
    let ratio = await readFileAsync(file);
    return ratio;
  } catch (err) {
    return err;
  }
}

/**
 * Format Date
 */
export const formatDate = dateObject => {
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

/**
 * Format Timer
 */
export const formatTimer = time => {
  const roundedSeconds = Math.floor(time);
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = roundedSeconds % 60;
  const result = minutes + ":" + seconds.toString().padStart(2, "0");
  return result;
};

/**
 * Get Unique Keys
 */
export const getUniqueKeys = (itemsList, key) => {
  const typeList = [];
  itemsList.forEach(item => {
    if (!typeList.includes(item[key])) typeList.push(item[key]);
  });
  typeList.sort();
  return typeList;
};

/**
 * Set intial image size
 */
export const setInitialImageSize = ratio => {
  const width = 20;
  const height = width * ratio;
  return { width: `${width}rem`, minHeight: `${height}rem` };
};
