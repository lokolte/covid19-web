/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getDoctor } from "../../actions/doctors";
import { isEmail } from "validator";
import { save } from "../../actions/doctors";

import "../../App.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Correo inválido.
      </div>
    );
  }
};

class DoctorEdit extends Component {
  constructor(props) {
    super(props);
    this.loadDoctor = this.loadDoctor.bind(this);
    this.save = this.save.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);

    this.state = {
      email: "",
      name: "",
      lastname: "",
      document: "",
      phone: "",
      address: "",
      latitude: 0.0,
      longitude: 0.0,
      loading: false,
      doctor: undefined,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangeDocument(e) {
    this.setState({
      document: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value,
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value,
    });
  }

  save(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    let data = {
      id: this.state.doctor.id,
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      document: this.state.document,
      phone: this.state.phone,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      birthDate: this.state.doctor.birthDate,
      sex: this.state.doctor.sex,
      status: this.state.doctor.status,
    };

    dispatch(save(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/doctors";
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  loadDoctor() {
    const { dispatch, doctor, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getDoctor(id)).then(() => {
      this.setState({
        doctor: doctor,
        name: doctor?.name,
        lastname: doctor?.lastname,
        email: doctor?.email,
        document: doctor?.document,
        address: doctor?.address,
        phone: doctor?.phone,
        latitude: doctor?.latitude,
        longitude: doctor?.longitude,
      });
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.doctor) {
      this.loadDoctor();
    }

    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Datos de la Cuenta</h3>
          </header>

          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={
                  this.state.doctor ? this.state.doctor.name : this.state.name
                }
                onChange={this.onChangeName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Apellido</label>
              <Input
                type="text"
                className="form-control"
                name="lastname"
                value={
                  this.state.doctor
                    ? this.state.doctor.lastname
                    : this.state.lastname
                }
                onChange={this.onChangeLastName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="document">Número de Documento</label>
              <Input
                type="text"
                className="form-control"
                name="document"
                value={
                  this.state.doctor
                    ? this.state.doctor.document
                    : this.state.document
                }
                onChange={this.onChangeDocument}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={
                  this.state.doctor ? this.state.doctor.email : this.state.email
                }
                onChange={this.onChangeEmail}
                validations={[required, email]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <Input
                type="text"
                className="form-control"
                name="phone"
                value={
                  this.state.doctor ? this.state.doctor.phone : this.state.phone
                }
                onChange={this.onChangePhone}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={
                  this.state.doctor
                    ? this.state.doctor.address
                    : this.state.address
                }
                onChange={this.onChangeAddress}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="latitude">Latitud</label>
              <Input
                type="text"
                className="form-control"
                name="latitude"
                value={
                  this.state.doctor
                    ? this.state.doctor.latitude
                    : this.state.latitude
                }
                onChange={this.onChangeLatitude}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitud</label>
              <Input
                type="text"
                className="form-control"
                name="longitude"
                value={
                  this.state.doctor
                    ? this.state.doctor.longitude
                    : this.state.longitude
                }
                onChange={this.onChangeLongitude}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Guardar datos</span>
              </button>
            </div>
          </Form>
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

export default connect(mapStateToProps)(withRouter(DoctorEdit));
