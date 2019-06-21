import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getUniqueTypes from "../../helpers/getUniqueTypes";

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

    const { filter } = this.props.match.params;

    this.setState({
      filter: filter
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Loading ...</p>
        ) : (
          <MessageList
            messages={this.state.messages}
            filter={this.state.filter}
          />
        )}
      </div>
    );
  }
}

Messages.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const MessageList = ({ messages, filter }) => {
  filter && (messages = messages.filter(message => message.type === filter));
  if (!messages.length) return <p>No messages.</p>;
  return (
    <ul>
      {messages.map(message => (
        <li key={message.timestamp}>
          <div>
            <strong>ID:</strong> {message.timestamp}
          </div>
          {message.image && (
            <div>
              <img src={message.image} alt={message.title} />
            </div>
          )}
          <div>
            <strong>Sound:</strong> <pre>{message.sound}</pre>
          </div>
        </li>
      ))}
    </ul>
  );
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase
)(Messages);

export default TransmitForm;
