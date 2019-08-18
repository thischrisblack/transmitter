import siteImage from "./assets/img/ChrisBlack-Train.jpg";

// This is for the site main image, and for Helmet tags.
export const siteMeta = {
  image: siteImage,
  title: "Your title",
  description: "Your description.",
  url: "https://www.yourUrl.com",
  twitterCreator: "@yourTwitterHandle"
};

// This is the user id for your Firebase Auth login.
export const config = {
  adminUid: "YOUR_FIREBASE_USER_ID"
};

// This can be found in the Project Settings of your Firebase App.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "_YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGE_SENDER_ID",
  appId: "YOUR_APP_ID"
};
