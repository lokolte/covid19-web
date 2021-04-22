/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getDoctor } from "../../actions/doctors";
import { isDoctor, isAdmin, isCoordinator } from "../../actions/generalActions";

import "../../App.css";

class CoordinatorView extends Component {
  constructor(props) {
    super(props);
    this.loadDoctor = this.loadDoctor.bind(this);

    this.state = {
      doctor: undefined,
    };
  }

  loadDoctor() {
    const { dispatch, doctor, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getDoctor(id)).then(() => {
      this.setState({
        doctor: doctor,
      });
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!isAdmin(currentUser.account.roles)) {
      return <Redirect to="/home" />;
    }

    if (!this.state.doctor) {
      this.loadDoctor();
    }

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/coordinators">Coordinadores </a>
          <span>/ Datos de la Cuenta</span>
        </div>
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Datos de la Cuenta</h3>
          </header>
          <p>
            <strong>Id:</strong> {this.state.doctor ? this.state.doctor.id : ""}
          </p>
          <p>
            <strong>Nombre:</strong>{" "}
            {this.state.doctor ? this.state.doctor.name : ""}
          </p>
          <p>
            <strong>Apellido:</strong>{" "}
            {this.state.doctor ? this.state.doctor.lastname : ""}
          </p>
          <p>
            <strong>Número de Documento:</strong>{" "}
            {this.state.doctor ? this.state.doctor.document : ""}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {this.state.doctor ? this.state.doctor.email : ""}
          </p>

          <p>
            <strong>Teléfono:</strong>{" "}
            {this.state.doctor ? this.state.doctor.phone : ""}
          </p>

          <p>
            <strong>Región:</strong>{" "}
            {this.state.doctor ? this.state.doctor.province : ""}
          </p>

          <p>
            <strong>Dirección:</strong>{" "}
            {this.state.doctor ? this.state.doctor.address : ""}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {this.state.doctor ? this.state.doctor.status : ""}
          </p>

          <p>
            <strong>Latitud:</strong>{" "}
            {this.state.doctor ? this.state.doctor.latitude : ""}
          </p>

          <p>
            <strong>Longitud:</strong>{" "}
            {this.state.doctor ? this.state.doctor.longitude : ""}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { doctor } = state.doctor;
  return {
    user,
    doctor,
  };
}

export default connect(mapStateToProps)(withRouter(CoordinatorView));
