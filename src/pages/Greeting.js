import React from "react";

import { siteMeta } from "../config";

const Greeting = () => {
  document.title = "Chris Black";
  return (
    <div className="greeting">
      <div className="greeting__img">
        <img src={siteMeta.image} alt={siteMeta.imageAlt} />
      </div>
      <p>
        This is Chris Black transmitting from an undisclosed location. Please
        remain calm.
      </p>
    </div>
  );
};

export default Greeting;
