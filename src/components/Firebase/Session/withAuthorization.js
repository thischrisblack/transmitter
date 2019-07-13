import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      // Sends user to sign-in if authUser provided by Firebase does not meet condition.
      // This is somewhat different from the behavior in the render conditional, because we don't have access to the context up here.
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {// Only renders Component if authUser provided by AuthUserContext meets the condition
          authUser =>
            condition(authUser) ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
