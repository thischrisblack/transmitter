import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

class AdminNav extends Component {
  componentDidMount() {
    document.title = "Transmitter";
  }
  render() {
    return (
      <div className="admin-nav">
        <Link to={ROUTES.ADMIN_TRANSMIT} className="admin-nav__link">
          TRANSMIT
        </Link>
        <Link to={ROUTES.ADMIN_MESSAGES} className="admin-nav__link">
          MESSAGES
        </Link>
        <Link to={ROUTES.ADMIN_CALENDAR} className="admin-nav__link">
          CALENDAR
        </Link>
        <Link to={ROUTES.ADMIN_BATCH} className="admin-nav__link">
          BATCH UPLOAD
        </Link>
        <Link to={ROUTES.HOME} className="admin-nav__link">
          HOME
        </Link>
      </div>
    );
  }
}

export default AdminNav;
