import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Signup from '../SignUp';
import Signin from '../SignIn';
import Admin from '../Admin';
import Transmit from '../Transmit';
import Home from '../Home';
import AuthPageTest from '../AuthPageTest';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SIGN_UP} component={Signup} />
      <Route path={ROUTES.SIGN_IN} component={Signin} />
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route path={ROUTES.TRANSMIT} component={Transmit} />
      <Route path={ROUTES.TEST_HOME} component={AuthPageTest} />
    </div>
  </Router>
)

export default withAuthentication(App);
