import React from "react";
import Message from "./Message";

const MessageList = ({ messages, filter, database }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>Nothing.</p>;

  return (
    <ul className="messages__list">
      {messages.map(message => (
        <Message
          message={message}
          key={message.timestamp}
          database={database}
        />
      ))}
    </ul>
  );
};

export default MessageList;
