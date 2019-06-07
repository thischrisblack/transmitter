export const transmitMessage = (state, firebase) => {
  const {
    type,
    title,
    message,
    image,
    sound,
    link,
    privatePost,
    sticky
  } = state;

  const timestamp = new Date().getTime();

  return firebase.message(timestamp).set({
    type,
    title,
    message,
    image,
    sound,
    link,
    privatePost,
    sticky
  });
};
