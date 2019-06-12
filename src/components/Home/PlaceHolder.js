import React from "react";
// import logo from '../../assets/CB-Logo-v06.png';
import Logo from "../Logo";

class PlaceHolder extends React.Component {
  render() {
    return (
      <div className="logo">
        <Logo width={"100%"} />
        <code>Chris Black</code>
      </div>
    );
  }
}

export default PlaceHolder;
