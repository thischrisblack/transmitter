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

export const getMessages = firebase => {
  return new Promise(resolve => {
    firebase.messages().once("value", snapshot => {
      const messagesObject = snapshot.val();

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
      }));

      resolve(messagesList);
    });
  });
};
