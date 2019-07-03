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
}

export default Firebase;
