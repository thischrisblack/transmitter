import React from "react";
import Header from "./Header";
import Messages from "./Messages/Messages";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="home__content">
          <Route path={ROUTES.HOME} component={Messages} />
          {/* <Route path={ROUTES.MUSIC} component={Music} />
          <Route path={ROUTES.CALENDAR} component={Calendar} /> */}
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
