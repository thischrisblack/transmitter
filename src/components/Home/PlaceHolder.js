import React from "react";
import Logo from "../UI/Logo";

class PlaceHolder extends React.Component {
  render() {
    return (
      <div className="logo">
        <Logo width={"140"} />
        <p>
          <strong>Chris Black</strong>
        </p>
      </div>
    );
  }
}

export default PlaceHolder;
