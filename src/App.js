/** @format */
import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardDoctor from "./components/board-doctor.component";
import BoardAdmin from "./components/board-admin.component";
import Navbar from "./components/sideBar/navbar.component";

import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/doctor" component={BoardDoctor} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
