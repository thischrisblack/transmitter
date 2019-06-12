/**
 * Post a new message to the Firebase Realtime Database.
 * @param {*} state - the state object from the calling component.
 * @param {*} firebase - the Firebase instnance.
 */
export const transmitMessage = (state, firebase) => {
  const {
    timestamp,
    type,
    title,
    message,
    image,
    sound,
    link,
    privatePost,
    sticky,
    social
  } = state;

  return firebase.message(timestamp).set({
    type,
    title,
    message,
    image,
    sound,
    link,
    privatePost,
    sticky,
    social
  });
};

/**
 * Uploads the given file to the Firebase Storage and returns the download URL for the file.
 * @param {*} file
 * @param {*} firebase - the Firebase instance.
 */
export const uploadFile = (file, firebase) => {
  return new Promise(resolve => {
    const storageRef = firebase.storage.ref();
    const filePath = storageRef.child(file.name);

    filePath.put(file).then(() => {
      filePath.getDownloadURL().then(url => {
        resolve(url);
      });
    });
  });
};

// Not used ...
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
