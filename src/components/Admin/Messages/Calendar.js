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
    const { loading, dates } = this.state;
    return (
      <div className="calendar">
        {loading && <Loading message="Loading..." />}
        <h1>CALENDAR</h1>
        <Link
          className="messages__add-date"
          to={{ pathname: "/lord/transmit", type: "calendar" }}
        >
          [add date]
        </Link>

        <MessageList
          messages={dates}
          firebase={this.props.firebase}
          database="calendarEvent"
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  firebase: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Calendar);
