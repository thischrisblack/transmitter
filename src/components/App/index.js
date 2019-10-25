import React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signin from "../Account/SignIn";
import Admin from "../Admin";
import Home from "../../pages/Home";
import ReactGA from "react-ga";

import Test from "../Test";

import * as ROUTES from "../../constants/routes";

function initializeReactGA() {
  ReactGA.initialize("UA-67947602-4");
  ReactGA.pageview("/");
}

initializeReactGA();

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

export default App;
