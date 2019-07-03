import React from "react";
import Logo from "../UI/Logo";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Navigation from "./Navigation";

const Header = location => {
  return (
    <header className="sidebar">
      <Link to={ROUTES.HOME}>
        <Logo width={"160"} />
      </Link>

      <Navigation location={location.location} />
    </header>
  );
};

export default Header;
