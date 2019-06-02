import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Admin from './components/Admin';
import Placeholder from './components/Placeholder';
import HomePage from './components/HomePage';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';


const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.HOME} component={Placeholder} />
      <Route path={ROUTES.SIGN_UP} component={Signup} />
      <Route path={ROUTES.SIGN_IN} component={Signin} />
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route path={ROUTES.TEST_HOME} component={HomePage} />
    </div>
  </Router>
)

export default withAuthentication(App);
