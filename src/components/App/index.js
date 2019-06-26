import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signin from "../Account/SignIn";
import Admin from "../Admin";
import Home from "../Home";
import Music from "../Home/Music";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Firebase/Session";

const App = () => (
  <Router>
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_IN} component={Signin} />
    <Route path={ROUTES.ADMIN} component={Admin} />
    <Route path={ROUTES.MUSIC} component={Music} />
  </Router>
);

export default withAuthentication(App);
