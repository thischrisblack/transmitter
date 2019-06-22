const timerFormat = time => {
  const justSeconds = Math.floor(time);
  const minutes = Math.floor(justSeconds / 60);
  const seconds = justSeconds % 60;
  return minutes + ":" + seconds.toString().padStart(2, "0");
};

export default timerFormat;
