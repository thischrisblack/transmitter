import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
// import TypeList from "./TypeList";
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
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", snapshot => {
      const messagesObject = snapshot.val() || {};

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
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
    return (
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}

        {/* <h3>MESSAGES</h3> */}

        {/* <TypeList
          types={this.state.typeList}
          updateFilter={this.updateFilter}
        /> */}

        <MessageList
          messages={this.state.messages}
          filter={this.state.filter}
          firebase={this.props.firebase}
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
