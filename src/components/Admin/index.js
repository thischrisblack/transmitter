import React, { Component } from "react";
import { withAuthorization } from "../Firebase/Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import PropTypes from "prop-types";

import AdminNav from "./Nav";
import TransmitForm from "./Transmit/TransmitForm";
import Messages from "./Messages/Messages";
import Calendar from "./Messages/Calendar";
import BatchUpload from "./Transmit/BatchUpload";

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <div className="adminContent">
          <Route exact path={ROUTES.ADMIN} component={AdminNav} />
          <Route path={ROUTES.ADMIN_TRANSMIT} component={TransmitForm} />
          <Route path={ROUTES.ADMIN_MESSAGES} component={Messages} />
          <Route path={ROUTES.ADMIN_CALENDAR} component={Calendar} />
          <Route path={ROUTES.ADMIN_BATCH} component={BatchUpload} />
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
