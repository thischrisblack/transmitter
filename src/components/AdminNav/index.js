import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

class AdminNav extends Component {
  render() {
    return (
      <div className="admin__nav">
        <div className="logo">
          <Logo width={"180"} />
        </div>
        <Link to={`/lord/transmit`} className="admin__nav admin__nav--link">
          TRANSMIT
        </Link>
      </div>
    );
  }
}

export default AdminNav;
