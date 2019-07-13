import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
import Loading from "../../UI/LoadingScreen";

class Calendar extends Component {
  state = {
    loading: true,
    dates: [],
    filterDate: null,
    beginningOfTime: 0
  };

  componentDidMount() {
    document.title = "Transmitter: Calendar";
    this.setState({ loading: true });

    this.props.firebase.calendar().on("value", snapshot => {
      const datesObject = snapshot.val() || {};

      let datesList = Object.keys(datesObject).map(key => ({
        ...datesObject[key],
        id: key
      }));

      const today = new Date().setHours(0, 0, 0, 0);

      this.setState({
        dates: datesList,
        filterDate: today,
        loading: false
      });
    });
  }

  toggleShowAll = () => {
    const newDate =
      this.state.filterDate === this.state.beginningOfTime
        ? new Date().setHours(0, 0, 0, 0)
        : this.state.beginningOfTime;
    this.setState({ filterDate: newDate });
  };

  componentWillUnmount() {
    this.props.firebase.calendar().off();
  }

  render() {
    const { loading, dates, filterDate, beginningOfTime } = this.state;
    return (
      <div className="calendar">
        {loading && <Loading message="Loading..." />}
        <h1>CALENDAR</h1>
        <span className="messages__show-all" onClick={this.toggleShowAll}>
          show {filterDate === beginningOfTime ? "future" : "all"}
        </span>
        <Link
          className="messages__add-date"
          to={{ pathname: "/lord/transmit", type: "calendar" }}
        >
          [add date]
        </Link>

        <MessageList
          messages={dates.filter(date => date.timestamp > filterDate)}
          database="calendarEvent"
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(Calendar);
