import React, { useState } from "react";
// import MyComponent from "./MyComponent";

const HOC = (Component, monkeyProp) => {
  console.log(monkeyProp);
  return function HOCwrapper(props) {
    const [clicks, setClicks] = useState(0);
    return <Component clicks={clicks} props={props} setClicks={setClicks} />;
  };
};
export default HOC;

// const HOC = Component => props => {
//   const [clicks, setClicks] = useState(3);
//   return <Component clicks={clicks} props={props} setClicks={setClicks} />;
// };
// export default HOC;
