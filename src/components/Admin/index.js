import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import SignOutButton from "../SignOut";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import TransmitForm from "../Transmit/TransmitForm";
import MessageList from "../MessageList";
import AdminNav from "../AdminNav";
import { Link, Route } from "react-router-dom";
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
    const { messages, typeList, loading } = this.state;

    return (
      <div className="admin">
        <div className="adminContent">
          <Route exact path={"/lord/"} component={AdminNav} />
          <Route path={`/lord/transmit`} component={TransmitForm} />
          <Route path={`/lord/messages`} component={MessageList} />
        </div>
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

const MOnkeyTown = ({ messages }) => (
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

Admin.propTypes = {
  firebase: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
