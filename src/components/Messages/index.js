import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getUniqueTypes from "../../helpers/getUniqueTypes";

class Messages extends Component {
  render() {
    return <div className="admin__message-list">BALLS</div>;
  }
}

Messages.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase
)(Messages);

export default TransmitForm;
