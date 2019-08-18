import React from "react";
import Header from "./Header";
import Messages from "./Messages/Messages";
import Calendar from "./Calendar/Calendar";
import Music from "./Music/Music";
import Greeting from "./Greeting";
import Contact from "./Contact";
import Code from "./Code/Code";
import SingleMessage from "./Messages/SingleMessage";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Helmet } from "react-helmet";

import { siteMeta } from "../../config";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{siteMeta.title + ": " + siteMeta.description}</title>
          <meta name="description" content={siteMeta.description} />
          <meta property="og:title" content={siteMeta.title} />
          <meta property="og:description" content={siteMeta.description} />
          <meta property="og:url" content={siteMeta.url} />
          <meta property="og:image" content={siteMeta.image} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={siteMeta.twitterCreator} />
          <meta name="twitter:creator" content={siteMeta.twitterCreator} />
          <meta name="twitter:title" content={siteMeta.title} />
          <meta name="twitter:description" content={siteMeta.description} />
          <meta name="twitter:image" content={siteMeta.image} />
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
