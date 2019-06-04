const messageSchema = {
  type,
  title,
  message,
  image,
  sound,
  link,
  private,
  sticky,
  social // Not in DB, just for sharing function.
}

let date = new Date().getTime();

