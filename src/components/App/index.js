import React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signin from "../Account/SignIn";
import Admin from "../Admin";
import Home from "../Home";

import Test from "../Test";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Firebase/Session";

const App = () => (
  <Router>
    <Switch>
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route path={ROUTES.SIGN_IN} component={Signin} />
      <Route path={"/test"} component={Test} />
      <Route path={ROUTES.HOME} component={Home} />
    </Switch>
  </Router>
);

export default withAuthentication(App);
