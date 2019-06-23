import React, { Component } from "react";
import { withAuthorization } from "../Firebase/Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import TransmitForm from "./Transmit/TransmitForm";
import Messages from "./Messages";
import AdminNav from "./Nav";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

class Admin extends Component {
  state = {
    loading: true,
    messages: [],
    typeList: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", snapshot => {
      const messagesObject = snapshot.val();

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
      }));

      this.setState({
        messages: messagesList,
        typeList: getUniqueTypes(messagesList, "type"),
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    return (
      <div className="admin">
        <div className="adminContent">
          <Route exact path="/lord/" component={AdminNav} />
          <Route path="/lord/transmit" component={TransmitForm} />
          <Route path="/lord/messages/" component={Messages} />
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
