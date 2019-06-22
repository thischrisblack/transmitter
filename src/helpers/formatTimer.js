const formatTimer = time => {
  const roundedSeconds = Math.floor(time);
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = roundedSeconds % 60;
  const result = minutes + ":" + seconds.toString().padStart(2, "0");
  return result;
};

export default formatTimer;
