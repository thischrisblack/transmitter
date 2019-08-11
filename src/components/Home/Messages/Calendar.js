import React, { Component } from "react";
import { Helmet } from "react-helmet";
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
    document.title = "Chris Black: Calendar";
    this.setState({ loading: true });

    this.props.firebase
      .calendar()
      .orderByChild("privatePost")
      .equalTo(false)
      .on("value", snapshot => {
        const datesObject = snapshot.val() || {};

        let datesList = Object.keys(datesObject).map(key => ({
          ...datesObject[key],
          id: key
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
      <div className="messages">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Chris Black: Calendar</title>
          <meta
            name="description"
            content="What's happening at the undisclosed location."
          />

          <meta property="og:title" content="Chris Black: Calendar" />
          <meta
            property="og:description"
            content="What's happening at the undisclosed location."
          />
          <meta
            property="og:url"
            content="https://www.chrisblack.net/calendar"
          />
          <meta name="twitter:title" content="Chris Black: Calendar" />
          <meta
            name="twitter:description"
            content="What's happening at the undisclosed location."
          />
        </Helmet>
        {loading && <Loading message="Loading..." />}

        <h2>Upcoming events.</h2>

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

export default withFirebase(Calendar);
