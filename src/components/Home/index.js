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
import { Helmet } from "react-helmet";

import greetingImg from "../../assets/img/ChrisBlack-Train.jpg";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Chris Black: Music and code from an undisclosed location.
          </title>
          <meta
            name="description"
            content="Transmitting music and code from an undisclosed location."
          />
          <meta property="og:title" content="Chris Black" />
          <meta
            property="og:description"
            content="Transmitting music and code from an undisclosed location."
          />
          <meta property="og:url" content="https://www.chrisblack.net" />
          <meta property="og:image" content={greetingImg} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@thischrisblack" />
          <meta name="twitter:creator" content="@thischrisblack" />
          <meta name="twitter:title" content="Chris Black" />
          <meta
            name="twitter:description"
            content="Transmitting music and code from an undisclosed location."
          />
          <meta name="twitter:image" content={greetingImg} />
        </Helmet>
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

export default Home;
