import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "../Account/SignUp";
import Signin from "../Account/SignIn";
import Admin from "../Admin";
import Transmit from "../Admin/Transmit";
import Home from "../Home";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Firebase/Session";

const App = () => (
  <Router>
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_UP} component={Signup} />
    <Route path={ROUTES.SIGN_IN} component={Signin} />
    <Route path={ROUTES.ADMIN} component={Admin} />
    <Route path={ROUTES.TRANSMIT} component={Transmit} />
  </Router>
);

export default withAuthentication(App);
