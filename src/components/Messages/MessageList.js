import React from "react";
import ReactMarkdown from "react-markdown";
import SoundPlayer from "../SoundPlayer";
import ReactPlayer from "react-player";

const MessageList = ({ messages, filter }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>No messages.</p>;

  return (
    <ul className="messages messages__list">
      {messages.map(message => (
        <li key={message.timestamp}>
          <div className="messages__list--timestamp">
            {new Date(Number(message.timestamp)).toUTCString()} ({message.type})
          </div>
          {message.title && (
            <div className="messages__list--title">{message.title}</div>
          )}
          {message.message && (
            <ReactMarkdown
              source={message.message}
              className="messages__list--message"
            />
            // <div className="messages__list--message">{message.message}</div>
          )}
          {message.image && (
            <div className="messages__list--image">
              <img src={message.image} alt={message.title} />
            </div>
          )}
          {message.link && (
            <div className="messages__list--link">{message.link}</div>
          )}
          {message.sound && (
            <SoundPlayer source={message.sound} />
            // <ReactPlayer
            //   url={message.sound}
            //   controls
            //   height="50px"
            //   width="100%"
            // />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
