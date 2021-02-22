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
import ChatPage from "./components/messages/message.component";

import Patients from "./components/patients/patient-list.component";
import PatientsAssignment from "./components/patients/patients-assignment.component";
import Assignment from "./components/patients/assignment.component";
import Forms from "./components/forms/form-list.component";
import Hospitals from "./components/hospitals/hospital-list.component";
import Answers from "./components/answers/answer.component";
import FormPatients from "./components/patients/form.component";
import AnswersForm from "./components/patients/answers.form.component";

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

          <div className="mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/patients" component={Patients} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/doctor" component={BoardDoctor} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/forms" component={Forms} />
              <Route path="/messages" component={ChatPage} />
              <Route path="/patients/:id/answers" component={Answers} />
              <Route path="/hospitals" component={Hospitals} />
              <Route
                path="/patients/:personId/forms/:formId/answers"
                component={AnswersForm}
              />
              <Route
                path="/patients/:personId/forms"
                component={FormPatients}
              />
              <Route
                exact
                path="/assign-patients"
                component={PatientsAssignment}
              />
              <Route
                path="/patients/:personId/assignment"
                component={Assignment}
              />
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
