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
import { getRoles } from "../../actions/roles";
import { getProvinces } from "../../actions/provinces";
import { isDoctor, isAdmin, isCoordinator } from "../../actions/generalActions";

import "../../App.css";
import asignados from "../../reducers/asignados";

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
    this.loadRoles = this.loadRoles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handleChangeRegion2 = this.handleChangeRegion2.bind(this);

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
      provinceId: undefined,
      roles: undefined,
      asignados: [],
      seleccionado: undefined,
      desSeleccionado: undefined,
      regionSeleccionada: undefined,
      regionDesSeleccionada: undefined,
      regionAsignados: [],
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

  loadRoles() {
    const { dispatch, location, roles } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getRoles(id)).then(() => {
      this.setState({
        roles: roles,
      });
    });
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

    if (this.state.phone == undefined || this.state.phone.trim() == "") {
      return false;
    }
    if (this.state.address == undefined || this.state.address.trim() == "") {
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

    const { dispatch, history } = this.props;

    const provincesIds = this.state.regionAsignados.map((p) => p.id);

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
      roles: this.state.asignados,
      province: this.state.regionSeleccionada,
      provinces: provincesIds,
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
        asignados: doctor?.roles,
        provinceId: doctor?.provinceId,
        regionAsignados: doctor?.provinces,
      });
      this.loadProvinces(doctor?.id);
    });
  }

  loadProvinces(id) {
    const { dispatch, provinces } = this.props;

    dispatch(getProvinces(id)).then(() => {
      this.setState({
        provinces: provinces,
      });
      document.getElementById("provinces").value = this.state.provinceId;
    });
  }

  addItem = () => {
    if (this.state.asignados == undefined) {
      this.setState({ asignados: [] });
    }
    var idSeleccionado = this.state.seleccionado;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.roles.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ roles: reduced });
    this.setState({ asignados: [...this.state.asignados, itemSeleccionado] });
    document.getElementById("roles").selectedIndex = -1;
  };

  removeItem = () => {
    var idSeleccionado = this.state.desSeleccionado;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.asignados.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ asignados: reduced });
    this.setState({ roles: [...this.state.roles, itemSeleccionado] });
    document.getElementById("asignados").selectedIndex = -1;
  };

  addItemRegion = () => {
    if (this.state.regionAsignados == undefined) {
      this.setState({ regionAsignados: [] });
    }
    var idSeleccionado = this.state.regionSeleccionada;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.provinces.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ provinces: reduced });
    this.setState({
      regionAsignados: [...this.state.regionAsignados, itemSeleccionado],
    });
    document.getElementById("provinces").selectedIndex = -1;
  };

  removeItemRegion = () => {
    var idSeleccionado = this.state.regionDesSeleccionada;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.regionAsignados.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ regionAsignados: reduced });
    this.setState({ provinces: [...this.state.provinces, itemSeleccionado] });
    document.getElementById("regionAsignados").selectedIndex = -1;
  };

  handleChange(e) {
    this.setState({ seleccionado: e.target.value });
  }

  handleChange2(e) {
    this.setState({ desSeleccionado: e.target.value });
  }

  handleChangeRegion(e) {
    this.setState({ regionSeleccionada: e.target.value });
  }

  handleChangeRegion2(e) {
    this.setState({ regionDesSeleccionada: e.target.value });
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

    if (!this.state.doctor) {
      this.loadDoctor();
    }

    if (!this.state.roles) {
      this.loadRoles();
    }

    var MakeItem = function (X) {
      return (
        <option value={X?.id}>
          {X?.id} - {X?.name}
        </option>
      );
    };

    var widthScreen = window.screen.width;

    if (widthScreen < 600) {
      return (
        <div className="content">
          <div className="navigation-bar">
            <a href="/doctors">Médicos</a>
            <span>/ Datos de la Cuenta</span>
          </div>
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
                <label htmlFor="email">
                  Correo <span class="required">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={
                    this.state.doctor
                      ? this.state.doctor.email
                      : this.state.email
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
                    this.state.doctor
                      ? this.state.doctor.phone
                      : this.state.phone
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

              <div>
                <div>
                  <label for="roles">Roles Disponibles</label> <br />
                  <select
                    size="5"
                    id="roles"
                    name="roles"
                    className="selectHospitals"
                    onChange={this.handleChange}
                  >
                    {this.state.roles?.map(MakeItem)}
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={this.addItem}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginTop: "12px",
                      marginBottom: "12px",
                      marginLeft: "132px",
                    }}
                  >
                    &gt; &gt;
                  </button>
                  <br />
                  <button
                    type="button"
                    onClick={this.removeItem}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginLeft: "132px",
                    }}
                  >
                    &lt; &lt;
                  </button>
                </div>
                <div>
                  <label for="asignados">Roles Asignados</label> <br />
                  <select
                    size="5"
                    id="asignados"
                    name="asignados"
                    onChange={this.handleChange2}
                    className="selectHospitals"
                  >
                    {this.state.asignados?.map(MakeItem)}
                  </select>
                </div>
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
    } else {
      return (
        <div className="content">
          <div className="navigation-bar">
            <a href="/doctors">Médicos</a>
            <span>/ Datos de la Cuenta</span>
          </div>
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
                <label htmlFor="email">
                  Correo <span class="required">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={
                    this.state.doctor
                      ? this.state.doctor.email
                      : this.state.email
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
                    this.state.doctor
                      ? this.state.doctor.phone
                      : this.state.phone
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

              <div class="Row">
                <div class="Column">
                  <label for="roles">Roles Disponibles</label> <br />
                  <select
                    size="5"
                    id="roles"
                    name="roles"
                    className="selectHospitals"
                    onChange={this.handleChange}
                  >
                    {this.state.roles?.map(MakeItem)}
                  </select>
                </div>

                <div class="Column">
                  <button
                    type="button"
                    onClick={this.addItem}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginTop: "92px",
                      marginBottom: "32px",
                      marginLeft: "132px",
                    }}
                  >
                    &gt; &gt;
                  </button>
                  <br />
                  <button
                    type="button"
                    onClick={this.removeItem}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginLeft: "132px",
                    }}
                  >
                    &lt; &lt;
                  </button>
                </div>
                <div class="Column">
                  <label for="asignados">Roles Asignados</label> <br />
                  <select
                    size="5"
                    id="asignados"
                    name="asignados"
                    onChange={this.handleChange2}
                    className="selectHospitals"
                  >
                    {this.state.asignados?.map(MakeItem)}
                  </select>
                </div>
              </div>

              <div class="Row">
                <div class="Column">
                  <label for="provinces">Región</label> <br />
                  <select
                    size="15"
                    id="provinces"
                    name="provinces"
                    className="selectHospitals"
                    onChange={this.handleChangeRegion}
                  >
                    {this.state.provinces?.map(MakeItem)}
                  </select>
                </div>

                <div class="Column">
                  <button
                    type="button"
                    onClick={this.addItemRegion}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginTop: "92px",
                      marginBottom: "32px",
                      marginLeft: "132px",
                    }}
                  >
                    &gt; &gt;
                  </button>
                  <br />
                  <button
                    type="button"
                    onClick={this.removeItemRegion}
                    style={{
                      borderRadius: "3px",
                      border: "1px solid #808080",
                      marginLeft: "132px",
                    }}
                  >
                    &lt; &lt;
                  </button>
                </div>
                <div class="Column">
                  <label for="regionAsignados">Regiones Asignadas</label> <br />
                  <select
                    size="15"
                    id="regionAsignados"
                    name="regionAsignados"
                    onChange={this.handleChangeRegion2}
                    className="selectHospitals"
                    style={{
                      marginLeft: "12px",
                    }}
                  >
                    {this.state.regionAsignados?.map(MakeItem)}
                  </select>
                </div>
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
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { doctor } = state.doctor;
  const { roles } = state.roles;
  const { provinces } = state.provinces;
  return {
    user,
    doctor,
    roles,
    provinces,
  };
}

export default connect(mapStateToProps)(withRouter(DoctorEdit));
