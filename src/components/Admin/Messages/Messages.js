import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
import TypeList from "./TypeList";
import Loading from "../../UI/LoadingScreen";

import { getUniqueKeys } from "../../../utils";

class Messages extends Component {
  state = {
    loading: true,
    messages: [],
    typeList: [],
    filter: null
  };

  componentDidMount() {
    document.title = "Transmitter: Messages";
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", snapshot => {
      const messagesObject = snapshot.val() || {};

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        id: key
      }));

      messagesList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

      this.setState({
        messages: messagesList,
        typeList: getUniqueKeys(messagesList, "type"),
        loading: false
      });
    });
  }

  updateFilter = event => {
    this.setState({ filter: event.target.id });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { loading, messages, typeList, filter } = this.state;
    return (
      <div className="messages">
        {loading && <Loading message="Loading..." />}

        <h1>MESSAGES</h1>

        <TypeList
          types={typeList}
          updateFilter={this.updateFilter}
          activeFilter={filter}
        />

        <MessageList
          messages={messages}
          filter={filter}
          // firebase={this.props.firebase}
          database="message"
        />
      </div>
    );
  }
}

Messages.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default withFirebase(Messages);
