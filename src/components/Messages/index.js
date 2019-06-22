import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import MessageList from "./MessageList";
import TypeList from "./TypeList";
import Static from "../Loading";

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

  updateFilter = event => {
    this.setState({ filter: event.target.id });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    return (
      <div className="messages">
        <Link to={`/lord`} className="closer">
          [close]
        </Link>
        {this.state.loading && <Static message="Loading..." />}

        <TypeList
          types={this.state.typeList}
          updateFilter={this.updateFilter}
        />

        <MessageList
          messages={this.state.messages}
          filter={this.state.filter}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Messages);
