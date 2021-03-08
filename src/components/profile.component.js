/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../actions/doctors";

import "../App.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido!
      </div>
    );
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.loadDoctor = this.loadDoctor.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeNewPassword2 = this.onChangeNewPassword2.bind(this);
    this.onChangePasswordOption = this.onChangePasswordOption.bind(this);

    this.state = {
      doctor: undefined,
      email: "",
      password: "",
      newpassword: "",
      newpassword2: "",
      loading: false,
      changePassword: false,
    };
  }

  loadDoctor() {
    var user = JSON.parse(localStorage.getItem("user"));
    var person = user.account.person;
    this.setState({
      doctor: {
        name: person.name,
        lastname: person.lastname,
        document: person.document,
        phone: person.phone,
        province: person.province,
        address: person.address,
      },
    });
  }

  onChangePasswordOption(e) {
    this.setState({
      changePassword: !this.state.changePassword,
    });
    if (!this.state.changePassword) {
      document.getElementById("cambiarPassword").style.display = "block";
    } else {
      document.getElementById("cambiarPassword").style.display = "none";
    }
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeNewPassword(e) {
    this.setState({
      newpassword: e.target.value,
    });
  }

  onChangeNewPassword2(e) {
    this.setState({
      newpassword2: e.target.value,
    });
  }

  save(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    let data = {
      password: this.state.password,
      newpassword: this.state.newpassword,
      newpassword2: this.state.newpassword2,
    };

    this.form.validateAll();

    const { dispatch } = this.props;

    dispatch(changePassword(data))
      .then(() => {
        alert("Password actualizado Exitosamente!");
        this.setState({
          changePassword: false,
          loading: false,
        });
        document.getElementById("cambiarPassword").style.display = "none";
        document.getElementById("checkbox").checked = false;
      })
      .catch(() => {
        alert("Ocurrio un error al actualizar el password");
        this.setState({
          loading: false,
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
            <h3>
              <strong>{currentUser.account.email}</strong> Profile
            </h3>
          </header>
          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
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
              <strong>Email:</strong> {currentUser.account.email}
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
            <strong>Authorities:</strong>
            <ul>
              <li>{currentUser.account.role.name}</li>
            </ul>

            <div className="form-group">
              <label htmlFor="password">Cambiar Password</label>
              <Input
                id="checkbox"
                type="checkbox"
                name="changePasswordOption"
                value={this.state.changePassword}
                onChange={this.onChangePasswordOption}
              />
            </div>

            <div id="cambiarPassword" style={{ display: "none" }}>
              <div className="form-group">
                <label htmlFor="password">Password actual</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Ingrese el nuevo Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.newpassword}
                  onChange={this.onChangeNewPassword}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirme el nuevo Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.newpassword2}
                  onChange={this.onChangeNewPassword2}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Cambiar Password</span>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
