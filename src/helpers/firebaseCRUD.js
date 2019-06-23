/**
 * Post a new message to the Firebase Realtime Database.
 * @param {*} state - the state object from the calling component.
 * @param {*} firebase - the Firebase instnance.
 */
export const transmitMessage = (post, firebase) => {
  const {
    timestamp,
    type,
    title,
    message,
    link,
    image,
    imageRatio,
    sound,
    privatePost,
    sticky,
    social
  } = post;

  const dbNode = type === "calendar" ? "calendarEvent" : "message";

  return firebase[dbNode](timestamp).set({
    type,
    title,
    message,
    link,
    image,
    imageRatio,
    sound,
    privatePost,
    sticky,
    social
  });
};

export const deleteMessage = (messageData, firebase) => {
  if (messageData.image) {
    const imageReference = firebase.storage.refFromURL(messageData.image);
    imageReference.delete().then(() => {
      console.log("Deleted image!");
    });
  }
  if (messageData.sound) {
    const soundReference = firebase.storage.refFromURL(messageData.sound);
    soundReference.delete().then(() => {
      console.log("Deleted sound!");
    });
  }
  firebase[messageData.database](messageData.postid).remove();
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
