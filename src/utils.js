export const resizeImage = event => {
  let imageStyle = event.currentTarget.style;
  imageStyle.width = imageStyle.width === "100%" ? "20rem" : "100%";
};
