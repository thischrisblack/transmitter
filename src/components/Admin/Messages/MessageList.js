import React from "react";
import Message from "./Message";

const MessageList = ({ messages, filter, firebase, database }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>Nothing.</p>;

  return (
    <ul className="messages__list">
      {messages.map(message => (
        <Message
          message={message}
          // firebase={firebase}
          key={message.id}
          database={database}
        />
      ))}
    </ul>
  );
};

export default MessageList;
