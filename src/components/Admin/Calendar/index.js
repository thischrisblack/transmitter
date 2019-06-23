import React, { Component } from "react";
import { withAuthorization } from "../../Firebase/Session";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import { config } from "../../../config";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getUniqueTypes from "../../../helpers/getUniqueTypes";
import CalendarList from "./CalendarList";
import Loading from "../../UI/LoadingScreen";

class Calendar extends Component {
  state = {
    loading: true,
    messages: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.calendar().on("value", snapshot => {
      const messagesObject = snapshot.val() || {};

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
      }));

      // messagesList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

      this.setState({
        messages: messagesList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.calendar().off();
  }

  render() {
    return (
      <div className="calendar">
        {/* <Link to={`/lord`} className="closer">
          [CLOSE]
        </Link> */}
        {this.state.loading && <Loading message="Loading..." />}

        <header className="calendar__header">
          <h1>CALENDAR</h1>
          <Link
            className="calendar__add-date"
            to={{ pathname: "/lord/transmit", type: "calendar" }}
          >
            [add date]
          </Link>
        </header>

        <CalendarList
          messages={this.state.messages}
          firebase={this.props.firebase}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Calendar);
