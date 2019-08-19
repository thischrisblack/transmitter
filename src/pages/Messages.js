import React from "react";
import { Helmet } from "react-helmet";
import GetPosts from "../components/GetPosts";
import Post from "../components/Post";
import Loading from "../components/LoadingScreen";
import { withFirebase } from "../components/Firebase";

import { siteMeta } from "../config";

const Messages = ({ messages, loading, database }) => {
  if (!loading && !messages.length) return <p>Nothing.</p>;

  return (
    <div className="messages">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{siteMeta.title}: Messages</title>
        <meta
          name="description"
          content="Messages transmitted from an undisclosed location."
        />

        <meta property="og:title" content="Chris Black: Messages" />
        <meta
          property="og:description"
          content="Messages transmitted from an undisclosed location."
        />
        <meta property="og:url" content="https://www.chrisblack.net/messages" />
        <meta name="twitter:title" content="Chris Black: Messages" />
        <meta
          name="twitter:description"
          content="Messages transmitted from an undisclosed location."
        />
      </Helmet>

      {loading && <Loading message="Loading..." />}

      <ul className="messages__list">
        {messages.map(message => (
          <Post message={message} key={message.id} database={database} />
        ))}
      </ul>
    </div>
  );
};

export default withFirebase(GetPosts(Messages, "messages"));
