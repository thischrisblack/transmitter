import React from "react";

import greetingImg from "../../assets/img/ChrisBlack-Train.jpg";

const Greeting = () => {
  return (
    <div className="greeting">
      <div className="greeting__img">
        <img src={greetingImg} alt="Chris Black in a train." height="665" />
      </div>
      <p>
        I am Chris Black, transmitting from an undisclosed location. Please
        remain calm.
      </p>
    </div>
  );
};

export default Greeting;
