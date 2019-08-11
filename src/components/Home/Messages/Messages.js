import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
import Loading from "../../UI/LoadingScreen";

class Messages extends Component {
  state = {
    loading: true,
    messages: [],
    filter: null
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild("privatePost")
      .equalTo(false)
      .on("value", snapshot => {
        const messagesObject = snapshot.val() || {};

        const messagesList = Object.keys(messagesObject).map(key => ({
          ...messagesObject[key],
          id: key
        }));

        messagesList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

        this.setState({
          messages: messagesList,
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
    const { loading, messages, filter } = this.state;
    return (
      <div className="messages">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Chris Black: Messages</title>
          <meta
            name="description"
            content="Messages transmitted from an undisclosed location."
          />

          <meta property="og:title" content="Chris Black: Messages" />
          <meta
            property="og:description"
            content="Messages transmitted from an undisclosed location."
          />
          <meta
            property="og:url"
            content="https://www.chrisblack.net/messages"
          />
          <meta name="twitter:title" content="Chris Black: Messages" />
          <meta
            name="twitter:description"
            content="Messages transmitted from an undisclosed location."
          />
        </Helmet>

        {loading && <Loading message="Loading..." />}

        <MessageList messages={messages} filter={filter} database="message" />
      </div>
    );
  }
}

Messages.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(Messages);
