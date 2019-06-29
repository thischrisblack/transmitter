import React from "react";
import Logo from "../UI/Logo";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="sidebar">
      <Link to={ROUTES.HOME}>
        <Logo width={"160"} />
      </Link>
      <div className="logo__name">Chris Black</div>
      <Navigation />
    </header>
  );
};

export default Header;
