import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Navigation = location => {
  return (
    <ul className="home-nav">
      <li
        className={
          "home-nav__item" +
          (location.location === "/messages" ? " active" : "")
        }
      >
        <Link to={ROUTES.MESSAGES}>messages</Link>
      </li>
      <li
        className={
          "home-nav__item" + (location.location === "/music" ? " active" : "")
        }
      >
        <Link to={ROUTES.MUSIC}>music</Link>
      </li>
      <li
        className={
          "home-nav__item" + (location.location === "/code" ? " active" : "")
        }
      >
        <Link to={ROUTES.CODE}>code</Link>
      </li>
      <li
        className={
          "home-nav__item" +
          (location.location === "/calendar" ? " active" : "")
        }
      >
        <Link to={ROUTES.CALENDAR}>calendar</Link>
      </li>
      <li
        className={
          "home-nav__item" + (location.location === "/contact" ? " active" : "")
        }
      >
        <Link to={ROUTES.CONTACT}>contact</Link>
      </li>
    </ul>
  );
};
export default Navigation;
