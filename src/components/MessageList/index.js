import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import PropTypes from "prop-types";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { transmitMessage, uploadFile } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";

class MessageList extends Component {
  render() {
    return <div className="admin__message-list">BALLS</div>;
  }
}

MessageList.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase
)(MessageList);

export default TransmitForm;
