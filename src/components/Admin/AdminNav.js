import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

class AdminNav extends Component {
  componentDidMount() {
    document.title = "Transmitter";
  }
  render() {
    return (
      <div className="admin__nav">
        <Link
          to={ROUTES.ADMIN_TRANSMIT}
          className="admin__nav admin__nav--link"
        >
          TRANSMIT
        </Link>
        <Link
          to={ROUTES.ADMIN_MESSAGES}
          className="admin__nav admin__nav--link"
        >
          MESSAGES
        </Link>
        <Link
          to={ROUTES.ADMIN_CALENDAR}
          className="admin__nav admin__nav--link"
        >
          CALENDAR
        </Link>
        <Link to={ROUTES.ADMIN_BATCH} className="admin__nav admin__nav--link">
          BATCH UPLOAD
        </Link>
        <Link to={ROUTES.HOME} className="admin__nav admin__nav--link">
          HOME
        </Link>
      </div>
    );
  }
}

export default AdminNav;
