/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getDoctor } from "../../actions/doctors";
import { getProvinces } from "../../actions/provinces";
import { isEmail } from "validator";
import { create } from "../../actions/doctors";
import { isDoctor, isAdmin, isCoordinator } from "../../actions/generalActions";

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

class DoctorAdd extends Component {
  constructor(props) {
    super(props);
    this.loadProvinces = this.loadProvinces.bind(this);
    this.save = this.save.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);

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
      provinces: undefined,
      provinceSelected: undefined,
      sexList: ["MASCULINO", "FEMENINO"],
      sexSelected: "MASCULINO", // Por defecto
      birthDate: undefined,
      password: undefined,
      password2: undefined,
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePassword2(e) {
    this.setState({
      password2: e.target.value,
    });
  }

  onChangeBirthDate(e) {
    console.log("birthDate : ", e.target.value);
    this.setState({
      birthDate: e.target.value,
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

  onChangeProvince(e) {
    this.setState({ provinceSelected: e.target.value });
  }

  onChangeSex(e) {
    this.setState({ sexSelected: e.target.value });
  }

  isFormValid() {
    if (this.state.name == undefined || this.state.name.trim() == "") {
      return false;
    }
    if (this.state.lastname == undefined || this.state.lastname.trim() == "") {
      return false;
    }

    if (this.state.document == undefined || this.state.document.trim() == "") {
      return false;
    }
    if (this.state.email == undefined || this.state.email.trim() == "") {
      return false;
    }
    if (this.state.birthDate == undefined || this.state.birthDate == null) {
      return false;
    }
    if (this.state.phone == undefined || this.state.phone.trim() == "") {
      return false;
    }
    if (this.state.address == undefined || this.state.address.trim() == "") {
      return false;
    }

    if (
      this.state.sexSelected == undefined ||
      this.state.sexSelected.trim() == ""
    ) {
      return false;
    }

    return true;
  }

  save(e) {
    e.preventDefault();
    this.form.validateAll();
    if (!this.isFormValid()) return;

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;

    let data = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      document: this.state.document,
      phone: this.state.phone,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      birthDate: this.state.birthDate,
      sex: this.state.sexSelected,
      province: this.state.provinceSelected,
      password: this.state.password,
      password2: this.state.password2,
    };

    dispatch(create(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/doctors";
      })
      .catch(() => {
        alert("Ocurrio un error");
        this.setState({
          loading: false,
        });
      });
  }

  loadProvinces() {
    const { dispatch, provinces } = this.props;

    dispatch(getProvinces()).then(() => {
      this.setState({
        provinces: provinces,
      });
      document.getElementById("provinces").value = this.state.provinceId;
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (
      !isAdmin(currentUser.account.roles) &&
      !isCoordinator(currentUser.account.roles)
    ) {
      return <Redirect to="/home" />;
    }

    if (!this.state.provinces) {
      this.loadProvinces();
    }

    var Data = [],
      MakeItem = function (X) {
        return (
          <option value={X?.id}>
            {X?.id} - {X?.name}
          </option>
        );
      },
      MakeItem2 = function (X) {
        return <option value={X}>{X}</option>;
      };

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/doctors">Médicos</a>
          <span>/ Agregar médico</span>
        </div>
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Agregar Médico</h3>
            <h5 className="titulo">
              *Esta función es válida para crear nuevos usuarios MÉDICOS que no
              existan en el sistema, incluso con rol de coordinador.
            </h5>
          </header>

          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="name">
                Nombre <span class="required">*</span>
              </label>
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
              <label htmlFor="lastname">
                Apellido <span class="required">*</span>
              </label>
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
              <label htmlFor="document">
                Número de Documento <span class="required">*</span>
              </label>
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
              <label htmlFor="birthDate">
                Fecha de nacimiento <span class="required">*</span>
              </label>
              <Input
                type="date"
                className="form-control"
                name="birthDate"
                value={this.state.birthDate}
                onChange={this.onChangeBirthDate}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Correo <span class="required">*</span>
              </label>
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
              <label htmlFor="phone">
                Teléfono <span class="required">*</span>
              </label>
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
              <label htmlFor="address">
                Dirección <span class="required">*</span>
              </label>
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
              <label htmlFor="sex">
                Sexo <span class="required">*</span>
              </label>
              <select id="sex" name="sex" onChange={this.onChangeSex}>
                {this.state.sexList?.map(MakeItem2)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="provinces">Región</label>
              <select
                id="provinces"
                name="provinces"
                onChange={this.onChangeProvince}
              >
                {this.state.provinces?.map(MakeItem)}
              </select>
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
              <label htmlFor="password">
                Password <span class="required">*</span>
              </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">
                Confirmar Password <span class="required">*</span>
              </label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChangePassword2}
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
  const { provinces } = state.provinces;
  return {
    user,
    provinces,
  };
}

export default connect(mapStateToProps)(withRouter(DoctorAdd));
