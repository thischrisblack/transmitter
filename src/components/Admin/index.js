import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { config } from '../../config';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on('value', snapshot => {
      const messagesObject = snapshot.val();

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key,
      }));

      this.setState({
        messages: messagesList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { messages, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList messages={messages} />
      </div>
    );
  }
}

const UserList = ({ messages }) => (
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

const condition = authUser => (authUser && authUser.uid === config.adminUid);

// export default withAuthorization(condition)(withFirebase(Admin));

export default compose(
  withAuthorization(condition),
  withFirebase,
)(Admin);