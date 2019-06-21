import React from "react";

const MessageList = ({ messages, filter }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>No messages.</p>;

  return (
    <ul className="messages">
      {messages.map(message => (
        <li key={message.timestamp}>
          <div className="messages__list--timestamp">
            {new Date(Number(message.timestamp)).toUTCString()}
          </div>
          {message.title && (
            <div className="messages__list--title">{message.title}</div>
          )}
          {message.message && (
            <div className="messages__list--message">{message.message}</div>
          )}
          {message.link && (
            <div className="messages__list--link">{message.link}</div>
          )}
          {message.image && (
            <div className="messages__list--image">
              <img src={message.image} alt={message.title} />
            </div>
          )}
          {message.sound && (
            <div className="messages__list--sound">{message.sound}</div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
