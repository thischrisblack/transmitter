import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminNav extends Component {
  render() {
    return (
      <div className="admin__nav">
        <Link to={`/lord/transmit`} className="admin__nav admin__nav--link">
          TRANSMIT
        </Link>
        <Link to={`/lord/messages`} className="admin__nav admin__nav--link">
          MESSAGES
        </Link>
        <Link to={`/lord/calendar`} className="admin__nav admin__nav--link">
          CALENDAR
        </Link>
        <Link
          to={`/lord/batchuploader`}
          className="admin__nav admin__nav--link"
        >
          BATCH UPLOAD
        </Link>
      </div>
    );
  }
}

export default AdminNav;