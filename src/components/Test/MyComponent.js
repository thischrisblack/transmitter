import React from "react";
// import HOC from "./HOC";

const MyComponent = ({ clicks, setClicks, props }) => {
  console.log(
    props.firebase.auth.currentUser && props.firebase.auth.currentUser.uid
  );

  return (
    <div>
      <p>You clicked {clicks} times.</p>
      <button onClick={() => setClicks(++clicks)}>More clicks</button>
    </div>
  );
};
export default MyComponent;
