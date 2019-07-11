import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { firebaseConfig } from "../../config";

class Firebase {
  constructor() {
    // Docs at https://firebase.google.com/docs/reference/js/firebase.app
    app.initializeApp(firebaseConfig);

    // Docs at https://firebase.google.com/docs/reference/js/firebase.auth
    this.auth = app.auth();

    // Docs at https://firebase.google.com/docs/reference/js/firebase.database
    this.db = app.database();

    // Docs at https://firebase.google.com/docs/storage/web/start
    this.storage = app.storage();
  }

  // *** Auth API ***

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  // *** Database API ***

  messages = () => this.db.ref("messages");
  message = timestamp => this.db.ref(`messages/${timestamp}`);

  calendar = () => this.db.ref("calendar");
  calendarEvent = timestamp => this.db.ref(`calendar/${timestamp}`);

  music = () => this.db.ref("music");
  musicTrack = timestamp => this.db.ref(`music/${timestamp}`);

  // *** Storage API ***

  storage = () => this.storage;

  // *** Transmit Message *** //
  transmitMessage = post => {
    const {
      id,
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

    const ref = id ? id : timestamp;

    return this[dbNode](ref).set({
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
    });
  };

  /*** Delete Message ***/
  deleteMessage = messageData => {
    if (messageData.image) {
      const imageReference = this.storage.refFromURL(messageData.image);
      imageReference.delete().then(() => {
        console.log("Deleted image!");
      });
    }
    if (messageData.sound) {
      const soundReference = this.storage.refFromURL(messageData.sound);
      soundReference.delete().then(() => {
        console.log("Deleted sound!");
      });
    }
    this[messageData.database](messageData.postid).remove();
  };

  /*** Upload File ***/
  uploadFile = file => {
    return new Promise(resolve => {
      const storageRef = this.storage.ref();
      const filePath = storageRef.child(file.name);

      filePath.put(file).then(() => {
        filePath.getDownloadURL().then(url => {
          resolve(url);
        });
      });
    });
  };
}

export default Firebase;
