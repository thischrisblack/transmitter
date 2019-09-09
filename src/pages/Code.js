import React from "react";
import { Helmet } from "react-helmet";
import GetPosts from "../components/GetPosts";
import Post from "../components/Post";
import Loading from "../components/LoadingScreen";
import { withFirebase } from "../components/Firebase";

const Code = ({ messages, loading, database }) => {
  if (!loading && !messages.length) return <p>Nothing.</p>;

  // Just display "code" posts.
  messages.length &&
    (messages = messages.filter(message => message.type === "code"));

  return (
    <div className="code">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chris Black: Code</title>
        <meta
          name="description"
          content="JavaScript, React, PHP, WordPress, and things like that."
        />

        <meta property="og:title" content="Chris Black: Code" />
        <meta
          property="og:description"
          content="JavaScript, React, PHP, WordPress, and things like that."
        />
        <meta property="og:url" content="https://www.chrisblack.net/code" />
        <meta name="twitter:title" content="Chris Black: Code" />
        <meta
          name="twitter:description"
          content="JavaScript, React, PHP, WordPress, and things like that."
        />
      </Helmet>

      {loading && <Loading message="Loading..." />}

      <div className="code__greeting">
        <h2>JavaScript, React, PHP, WordPress, and things like that.</h2>

        <p>
          I am a front-end developer currently obsessed with JavaScript and
          everything around it. Do you need some code written? I'd love to talk
          to you about your project.
        </p>

        <p>
          Please have a look at my{" "}
          <a
            href="https://thischrisblack.github.io/Resume-the-Hard-Way/"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
          . You can reach me by email at{" "}
          <a href="mailto:black@chrisblack.net">black@chrisblack.net</a>.
        </p>
        <h3>Projects and experiments:</h3>
      </div>

      <ul className="messages__list">
        {messages.map(message => (
          <Post message={message} key={message.id} database={database} />
        ))}
      </ul>
    </div>
  );
};

export default withFirebase(GetPosts(Code, "messages"));
