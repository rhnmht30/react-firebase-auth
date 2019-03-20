import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import LandingPage from "../Landing/Landing";
import SignUpPage from "../SignUp/SignUp";
import SignInPage from "../SignIn/SignIn";
import PasswordForgetPage from "../PasswordForget/PasswordForget";
import HomePage from "../Home/Home";
import AccountPage from "../Account/Account";
import AdminPage from "../Admin/Admin";

import * as ROUTES from "../../constants/routes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>
    );
  }
}
