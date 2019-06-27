import React from "react";
import Message from "./Message";

const MessageList = ({ messages, filter, firebase, database }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>No messages.</p>;

  return (
    <ul className="messages messages__list">
      {messages.map(message => (
        <Message
          message={message}
          firebase={firebase}
          key={message.timestamp}
          database={database}
        />
      ))}
    </ul>
  );
};

export default MessageList;
