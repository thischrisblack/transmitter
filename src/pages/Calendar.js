import React from "react";
import { Helmet } from "react-helmet";
import GetPosts from "../components/GetPosts";
import Post from "../components/Post";
import Loading from "../components/LoadingScreen";
import { withFirebase } from "../components/Firebase";

import { siteMeta } from "../config";

const Calendar = ({ messages, loading, database }) => {
  if (!loading && !messages.length)
    return (
      <div className="calendar">
        <p>Nothing happening.</p>
      </div>
    );

  return (
    <div className="calendar">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{siteMeta.title}: Messages</title>
        <meta
          name="description"
          content="Events transmitted from an undisclosed location."
        />

        <meta property="og:title" content="Chris Black: Events" />
        <meta
          property="og:description"
          content="Events transmitted from an undisclosed location."
        />
        <meta property="og:url" content="https://www.chrisblack.net/calendar" />
        <meta name="twitter:title" content="Chris Black: Events" />
        <meta
          name="twitter:description"
          content="Events transmitted from an undisclosed location."
        />
      </Helmet>

      {loading && <Loading message="Loading..." />}

      <h2>Events</h2>

      <ul className="messages__list">
        {messages.map(message => (
          <Post message={message} key={message.id} database={database} />
        ))}
      </ul>
    </div>
  );
};

export default withFirebase(GetPosts(Calendar, "calendar"));
