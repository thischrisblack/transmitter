import React, { useState, useEffect } from "react";
import { withFirebase } from "../../Firebase";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

import SoundPlayer from "../../UI/SoundPlayer";
import Loading from "../../UI/LoadingScreen";

const SingleMessage = props => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    props.firebase.message(props.match.params.id).once("value", snapshot => {
      setMessage({ ...snapshot.val() });
      setLoading(false);
    });
  }, [props]);

  return (
    <div className="single-message">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {loading && <Loading message="Loading..." />}

      {message && (
        <div>
          {message.timestamp && (
            <div className="single-message__timestamp">
              {new Date(Number(message.timestamp)).toUTCString()}
            </div>
          )}

          {message.title && (
            <div className="single-message__title">{message.title}</div>
          )}

          {message.image && (
            <div
              className="single-message__image"
              style={{
                width: "100%",
                paddingTop: `${message.imageRatio * 99.7}%`
              }}
            >
              <img src={message.image} alt={message.title} />
            </div>
          )}

          {message.message && (
            <ReactMarkdown
              source={message.message}
              className="single-message__message"
            />
          )}
          <div className="clear" />
          {message.link && (
            <a
              className="single-message__link"
              href={message.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {message.link.split("/")[2]}
            </a>
          )}
          {message.sound && <SoundPlayer source={message.sound} />}
        </div>
      )}
    </div>
  );
};

export default withFirebase(SingleMessage);
