import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "../Messages/MessageList";
import Loading from "../../UI/LoadingScreen";

class Code extends Component {
  state = {
    loading: true,
    messages: []
  };

  componentDidMount() {
    document.title = "Chris Black: Code";
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild("privatePost")
      .equalTo(false)
      .on("value", snapshot => {
        const messagesObject = snapshot.val() || {};

        const messagesList = Object.keys(messagesObject).map(key => ({
          ...messagesObject[key],
          timestamp: key
        }));

        messagesList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

        this.setState({
          messages: messagesList,
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { loading, messages } = this.state;
    return (
      <div className="code">
        {loading && <Loading message="Loading..." />}

        <div className="code__greeting">
          <h2>JavaScript, React, PHP, WordPress, and things like that.</h2>

          <p>
            I am a full-stack developer currently obsessed with React and all
            things JavaScript. I'd love to talk to you about your project.
          </p>

          <p>
            Please have a look at my{" "}
            <a
              href="https://thischrisblack.github.io/Resume-the-Hard-Way/"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>
            . You can reach me by email at{" "}
            <a href="mailto:black@chrisblack.net">black@chrisblack.net</a>.
          </p>
          <h3>Projects and experiments:</h3>
        </div>

        <MessageList
          messages={messages}
          filter="code"
          firebase={this.props.firebase}
          database="message"
        />
      </div>
    );
  }
}

Code.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(Code);
