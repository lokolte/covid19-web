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
import { save } from "../../actions/doctors";
import { getRoles } from "../../actions/roles";
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

class CoordinatorEdit extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.loadProvinces = this.loadProvinces.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.loadRoles = this.loadRoles.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

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
      seleccionado: undefined,
      roles: undefined,
      asignados: [],
      rolSeleccionado: undefined,
      desSeleccionado: undefined,
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

  handleChange(e) {
    this.setState({ seleccionado: e.target.value });
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
    if (!this.isFormValid()) {
      console.log("no valido");
      return;
    }
    this.setState({
      loading: true,
    });

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
      province: this.state.seleccionado,
      roles: this.state.asignados,
    };

    dispatch(save(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/coordinators";
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  loadData() {
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
        provinceId: doctor?.provinceId,
        seleccionado: doctor?.provinceId,
        asignados: doctor?.roles,
      });
      this.loadProvinces();
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

  addItem = () => {
    if (this.state.asignados == undefined) {
      this.setState({ asignados: [] });
    }
    var idSeleccionado = this.state.rolSeleccionado;
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

  handleChange1(e) {
    this.setState({ rolSeleccionado: e.target.value });
  }

  handleChange2(e) {
    this.setState({ desSeleccionado: e.target.value });
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
      this.loadData();
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

    var Data = [],
      MakeItem = function (X) {
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
            <a href="/coordinators">Coordinadores </a>
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="provinces">Región</label>
                <select
                  id="provinces"
                  name="provinces"
                  onChange={this.handleChange}
                >
                  {this.state.provinces?.map(MakeItem)}
                </select>
              </div>

              <div>
                <div>
                  <label for="roles">Roles Disponibles</label> <br />
                  <select
                    size="5"
                    id="roles"
                    name="roles"
                    className="selectHospitals"
                    onChange={this.handleChange1}
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
                    style={{
                      marginBottom: "12px",
                    }}
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
            <a href="/coordinators">Coordinadores </a>
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="provinces">Región</label>
                <select
                  id="provinces"
                  name="provinces"
                  onChange={this.handleChange}
                >
                  {this.state.provinces?.map(MakeItem)}
                </select>
              </div>

              <div class="Row">
                <div class="Column">
                  <label for="roles">Roles Disponibles</label> <br />
                  <select
                    size="5"
                    id="roles"
                    name="roles"
                    className="selectHospitals"
                    onChange={this.handleChange1}
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
  const { provinces } = state.provinces;
  const { roles } = state.roles;
  return {
    user,
    doctor,
    provinces,
    roles,
  };
}

export default connect(mapStateToProps)(withRouter(CoordinatorEdit));
