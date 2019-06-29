import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
import Loading from "../../UI/LoadingScreen";

class Calendar extends Component {
  state = {
    loading: true,
    dates: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .calendar()
      .orderByChild("privatePost")
      .equalTo(false)
      .on("value", snapshot => {
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
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}

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

export default withFirebase(Calendar);
