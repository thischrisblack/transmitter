import React from "react";
import Header from "./Header";
import Messages from "./Messages/Messages";
import Calendar from "./Messages/Calendar";
import Music from "./Music/Music";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="home__content">
          <Route path={ROUTES.MESSAGES} component={Messages} />
          <Route path={ROUTES.CALENDAR} component={Calendar} />
          <Route path={ROUTES.MUSIC} component={Music} />

          {/* <Route path={ROUTES.MUSIC} component={Music} />
          <Route path={ROUTES.CALENDAR} component={Calendar} /> */}
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
