import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import SignOutButton from "../SignOut";
import getUniqueTypes from "../../helpers/getUniqueTypes";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
      typeList: []
    };
  }

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

    // // If I want to use the external function.
    // getMessages(this.props.firebase).then(messageList => {
    //   this.setState({
    //     messages: messageList,
    //     typeList: getUniqueTypes(messageList, "type"),
    //     loading: false
    //   });
    // });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { messages, typeList, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <TypeList types={typeList} />
        <MessageList messages={messages} />
        <SignOutButton />
      </div>
    );
  }
}

const TypeList = ({ types }) => (
  <ul>
    {types.map(type => (
      <li key={type}>
        <span>
          <strong>Type:</strong> {type}
        </span>
      </li>
    ))}
  </ul>
);

const MessageList = ({ messages }) => (
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

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
