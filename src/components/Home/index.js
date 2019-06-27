import React from "react";
import Header from "./Header";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="home__content">Balls.</div>
      </div>
    );
  }
}

export default Home;
