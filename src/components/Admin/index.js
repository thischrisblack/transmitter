import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import SignOutButton from "../SignOut";
import { getMessagesAndTypes } from "../../helpers/firebaseCRUD";

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

    getMessagesAndTypes(this.props.firebase).then(response => {
      this.setState({
        messages: response.messagesList,
        typeList: response.typeList,
        loading: false
      });
    });

    // this.props.firebase.messages().on("value", snapshot => {
    //   const messagesObject = snapshot.val();

    //   const messagesList = Object.keys(messagesObject).map(key => ({
    //     ...messagesObject[key],
    //     timestamp: key
    //   }));

    //   const typeList = getUniqueTypes(messagesList, "type");

    //   this.setState({
    //     messages: messagesList,
    //     typeList: typeList,
    //     loading: false
    //   });
    // });
  }

  componentWillUnmount() {}

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
        <span>
          <strong>ID:</strong> {message.timestamp}
        </span>
        <span>
          <strong>E-Mail:</strong> {message.title}
        </span>
        <span>
          <strong>Username:</strong> <pre>{message.message}</pre>
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
