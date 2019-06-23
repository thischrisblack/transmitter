import React from "react";
import PlaceHolder from "./PlaceHolder";
import Messages from "../Admin/Messages";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <PlaceHolder />

        <p>I like to get all monkeyfied and go out to bananatown.</p>
      </div>
    );
  }
}

export default Home;
