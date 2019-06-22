import React from "react";
import ReactMarkdown from "react-markdown";
import SoundPlayer from "../SoundPlayer";

const MessageList = ({ messages, filter }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>No messages.</p>;

  const handleClick = event => {
    let width = event.currentTarget.style.width;
    event.currentTarget.style.width = width === "100%" ? "20rem" : "100%";
  };

  return (
    <ul className="messages messages__list">
      {messages.map(message => {
        let placeholderStyle;
        if (message.imageRatio) {
          const height = 20 * message.imageRatio;
          placeholderStyle = { minHeight: `${height}rem` };
        }
        return (
          <li key={message.timestamp}>
            <div className="messages__list--timestamp">
              {new Date(Number(message.timestamp)).toUTCString()}
            </div>
            {message.title && (
              <div className="messages__list--title">{message.title}</div>
            )}
            {message.image && (
              <div
                className="messages__list--image"
                onClick={handleClick}
                style={placeholderStyle}
              >
                <img src={message.image} alt={message.title} />
              </div>
            )}
            {message.message && (
              <ReactMarkdown
                source={message.message}
                className="messages__list--message"
              />
            )}
            {message.link && (
              <a className="messages__list--link" href={message.link}>
                {message.link.split("/")[2]}
              </a>
            )}
            <div className="clear" />
            {message.sound && <SoundPlayer source={message.sound} />}
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
