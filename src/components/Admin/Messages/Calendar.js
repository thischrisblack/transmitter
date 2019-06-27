import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "../../Firebase/Session";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import PropTypes from "prop-types";

import { config } from "../../../config";

import MessageList from "./MessageList";
import Loading from "../../UI/LoadingScreen";

class Calendar extends Component {
  state = {
    loading: true,
    dates: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.calendar().on("value", snapshot => {
      const datesObject = snapshot.val() || {};

      let datesList = Object.keys(datesObject).map(key => ({
        ...datesObject[key],
        timestamp: key
      }));

      const today = new Date().setHours(0, 0, 0, 0);

      datesList = datesList.filter(date => date.timestamp > today);

      this.setState({
        dates: datesList,
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

        <MessageList
          messages={this.state.dates}
          firebase={this.props.firebase}
          database="calendarEvent"
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
