import React from "react";
import Logo from "../UI/Logo";

class Header extends React.Component {
  render() {
    return (
      <header class="sidebar">
        <div className="logo">
          <Logo width={"150"} />
        </div>
        <div className="nav">
          messages
          <br />
          balls
          <br />
          monkey
          <br />
          blerg
        </div>
      </header>
    );
  }
}

export default Header;
