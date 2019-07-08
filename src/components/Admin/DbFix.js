import React, { Component } from "react";
import { withAuthorization } from "../Firebase/Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import PropTypes from "prop-types";

import Loading from "../UI/LoadingScreen";

class DbFix extends Component {
  state = {
    loading: true,
    messages: [],
    typeList: [],
    filter: null
  };

  componentDidMount() {
    document.title = "Transmitter: Messages";
    this.setState({ loading: true });

    this.props.firebase.messages().once("value", snapshot => {
      const messagesObject = snapshot.val();

      // LOOK
      // Change "timestamp" to "id"
      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key,
        id: null
      }));

      this.setState({
        messages: messagesList,
        loading: false
      });

      console.log(this.props.firebase.db);

      messagesList.forEach(message => {
        this.transmitMessage(message, this.props.firebase);
      });

      messagesList.forEach(message => {
        this.deleteMessage(message.timestamp, this.props.firebase);
      });
    });
  }

  transmitMessage = (post, firebase) => {
    const {
      timestamp,
      type,
      title,
      message,
      link,
      image,
      imageRatio,
      sound,
      privatePost,
      sticky,
      social
    } = post;

    return firebase.messages(timestamp).set({
      timestamp,
      type,
      title,
      message,
      link,
      image,
      imageRatio,
      sound,
      privatePost,
      sticky,
      social
    });
  };

  deleteMessage = (timestamp, firebase) => {
    firebase.messages(timestamp).remove();
  };

  componentWillUnmount() {}

  render() {
    const { loading } = this.state;
    return (
      <div className="messages">
        {loading && <Loading message="Loading..." />}

        <h1>DB Fixer</h1>
      </div>
    );
  }
}

DbFix.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(DbFix);
