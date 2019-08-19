import React from "react";
// import HOC from "./HOC";

const MessageTest = ({ messages, loading, database }) => {
  console.log(messages, loading, database);

  return (
    <div>
      <p>{loading ? "LOADING" : "BALLS"}</p>
    </div>
  );
};
export default MessageTest;
