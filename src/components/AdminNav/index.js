import React, { Component } from "react";

import { Link } from "react-router-dom";

class AdminNav extends Component {
  render() {
    return (
      <div className="admin__nav">
        <Link to={`/lord/transmit`} className="admin__nav--link">
          TRANSMIT
        </Link>
      </div>
    );
  }
}

export default AdminNav;
