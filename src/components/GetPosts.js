import React, { useState, useEffect } from "react";

const GetPosts = (Component, database) => {
  return function GetPostsWrapper(props) {
    const [messages, setMessages] = useState({
      data: [],
      loading: true
    });

    useEffect(() => {
      if (messages.loading) {
        props.firebase[database]()
          .orderByChild("privatePost")
          .equalTo(false)
          .on("value", snapshot => {
            const messagesObject = snapshot.val() || {};

            let messagesList = Object.keys(messagesObject).map(key => ({
              ...messagesObject[key],
              id: key
            }));

            if (database === "messages") {
              messagesList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
            }

            if (database === "calendar") {
              const today = Date.now();
              messagesList = messagesList.filter(
                date => date.timestamp > today
              );
            }

            setMessages({
              data: messagesList,
              loading: false
            });
          });
      }
    });

    return (
      <Component
        messages={messages.data}
        loading={messages.loading}
        database={database}
      />
    );
  };
};

export default GetPosts;
