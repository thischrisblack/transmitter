import React, { Component } from "react";
import { withAuthorization } from "../Firebase/Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import TransmitForm from "./Transmit/TransmitForm";
import Messages from "./Messages";
import Calendar from "./Calendar";
import AdminNav from "./Nav";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import BatchUpload from "./Transmit/BatchUpload";

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <div className="adminContent">
          <Route exact path="/lord/" component={AdminNav} />
          <Route path="/lord/transmit" component={TransmitForm} />
          <Route path="/lord/messages/" component={Messages} />
          <Route path="/lord/calendar/" component={Calendar} />
          <Route path="/lord/batch/" component={BatchUpload} />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  firebase: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
