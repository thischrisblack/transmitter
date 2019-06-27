import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from ".";
import Firebase, { FirebaseContext } from "../Firebase";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
