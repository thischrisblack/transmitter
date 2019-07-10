import React from "react";
import Header from "./Header";
import Messages from "./Messages/Messages";
import Calendar from "./Messages/Calendar";
import Music from "./Music/Music";
import Greeting from "./Greeting";
import Contact from "./Contact";
import Code from "./Code/Code";
import SingleMessage from "./Messages/SingleMessage";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

/**
 * Okay, go into Navigation, make it a class, add withFirebase and the componentDidMount to it, and then get rid of the componentDidMount from here.
 */

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header location={this.props.location.pathname} />
        <div className="home__content">
          <Route path={ROUTES.MESSAGES} component={Messages} />
          <Route
            path={ROUTES.MESSAGE}
            render={props => <SingleMessage {...props} />}
          />
          <Route path={ROUTES.CALENDAR} component={Calendar} />
          <Route path={ROUTES.MUSIC} component={Music} />
          <Route path={ROUTES.CODE} component={Code} />
          <Route path={ROUTES.CONTACT} component={Contact} />
          <Route exact path={ROUTES.HOME} component={Greeting} />
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
