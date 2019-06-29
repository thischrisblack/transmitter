import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Navigation = () => (
  <ul className="home-nav">
    <li className="home-nav__item">
      <Link to={ROUTES.MESSAGES}>messages</Link>
    </li>
    <li className="home-nav__item">
      <Link to={ROUTES.CALENDAR}>calendar</Link>
    </li>
  </ul>
);
export default Navigation;
