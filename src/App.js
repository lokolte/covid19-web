/** @format */
import { connect } from "react-redux";
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import SendEmail from "./components/send.email.component";
import ResetPassword from "./components/reset.password.component";
import Profile from "./components/profile.component";
import BoardDoctor from "./components/board-doctor.component";
import BoardAdmin from "./components/board-admin.component";
import Navbar from "./components/sideBar/navbar.component";
import ChatPage from "./components/messages/message.component";

import Patients from "./components/patients/patient-list.component";
import PatientsAssignment from "./components/patients/patients-assignment.component";
import Assignment from "./components/patients/assignment.component";
import Forms from "./components/forms/form-list.component";
import FormsAdd from "./components/forms/forms-new.component";
import FormsEdit from "./components/forms/forms-edit.component";
import ItemList from "./components/forms/item-list.component";
import ItemAdd from "./components/forms/item-new.component";
import ItemEdit from "./components/forms/item-edit.component";
import Questions from "./components/forms/question-list.component";
import Hospitals from "./components/hospitals/hospital-list.component";
import HospitalEdit from "./components/hospitals/hospital-edit.component";
import HospitalAdd from "./components/hospitals/hospital-new.component";
import Doctors from "./components/doctors/doctor-list.component";
import DoctorView from "./components/doctors/doctor-view.component";
import DoctorEdit from "./components/doctors/doctor-edit.component";
import DoctorAdd from "./components/doctors/doctor-new.component";
import AsignHospital from "./components/doctors/asign-hospital.component";
import Answers from "./components/answers/answer.component";
import FormPatients from "./components/patients/form.component";
import AnswersForm from "./components/patients/answers.form.component";
import Coordinators from "./components/coordinators/coordinator-list.component";
import CoordinatorView from "./components/coordinators/coordinator-view.component";
import CoordinatorEdit from "./components/coordinators/coordinator-edit.component";
import CoordinatorAdd from "./components/coordinators/coordinator-new.component";

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
              <Route exact path="/answers" component={Patients} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/send-email" component={SendEmail} />
              <Route path="/reset-password/:token" component={ResetPassword} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/doctor" component={BoardDoctor} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/forms/:id/answers" component={Questions} />
              <Route path="/forms/new" component={FormsAdd} />
              <Route path="/forms/:id/edit" component={FormsEdit} />
              <Route path="/forms" component={Forms} />
              <Route path="/items/new" component={ItemAdd} />
              <Route path="/items/:id/edit" component={ItemEdit} />
              <Route path="/items" component={ItemList} />
              <Route path="/messages" component={ChatPage} />
              <Route path="/patients/:id/answers" component={Answers} />
              <Route path="/hospitals/:id/edit" component={HospitalEdit} />
              <Route path="/hospitals/new" component={HospitalAdd} />
              <Route path="/hospitals" component={Hospitals} />
              <Route path="/doctors/:id/view" component={DoctorView} />
              <Route path="/doctors/:id/edit" component={DoctorEdit} />
              <Route path="/doctors/new" component={DoctorAdd} />
              <Route
                path="/coordinators/:id/edit"
                component={CoordinatorEdit}
              />
              <Route path="/coordinators/new" component={CoordinatorAdd} />

              <Route
                path="/coordinators/:id/view"
                component={CoordinatorView}
              />
              <Route path="/coordinators" component={Coordinators} />

              <Route
                path="/doctors/:id/asign-hospital"
                component={AsignHospital}
              />
              <Route path="/doctors" component={Doctors} />
              <Route
                path="/answers/:personId/forms/:formId/answers"
                component={AnswersForm}
              />
              <Route path="/answers/:personId/forms" component={FormPatients} />
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
