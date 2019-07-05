import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";
import { config } from "../../config";

class Navigation extends React.Component {
  state = { authUser: null };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser: authUser.uid })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <ul className="home-nav">
        <li
          className={
            "home-nav__item" +
            (this.props.location === "/messages" ? " active" : "")
          }
        >
          <Link to={ROUTES.MESSAGES}>messages</Link>
        </li>
        <li
          className={
            "home-nav__item" +
            (this.props.location === "/music" ? " active" : "")
          }
        >
          <Link to={ROUTES.MUSIC}>music</Link>
        </li>
        <li
          className={
            "home-nav__item" +
            (this.props.location === "/code" ? " active" : "")
          }
        >
          <Link to={ROUTES.CODE}>code</Link>
        </li>
        <li
          className={
            "home-nav__item" +
            (this.props.location === "/calendar" ? " active" : "")
          }
        >
          <Link to={ROUTES.CALENDAR}>calendar</Link>
        </li>
        <li
          className={
            "home-nav__item" +
            (this.props.location === "/contact" ? " active" : "")
          }
        >
          <Link to={ROUTES.CONTACT}>contact</Link>
        </li>
        {config.adminUid === this.state.authUser && (
          <li className="home-nav__item">
            <Link to={ROUTES.ADMIN}>TRANSMIT</Link>
          </li>
        )}
      </ul>
    );
  }
}
export default withFirebase(Navigation);
