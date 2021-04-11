/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { connect } from "react-redux";
import { resetPassword } from "../actions/auth";

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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    this.state = {
      password: "",
      password2: "",
      loading: false,
    };
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

  resetPassword(e) {
    e.preventDefault();
    const { dispatch, location } = this.props;

    this.setState({
      loading: true,
    });

    let path = location.pathname;
    let tokens = path.split("/");
    let token = tokens[2];

    console.log("cambiar password : ", this.state.password);
    console.log("cambiar password : ", this.state.password2);

    dispatch(resetPassword(token, this.state.password, this.state.password2))
      .then(() => {
        alert("Contraseña cambiada exitosamente");
        window.location.href = "/login";
      })
      .catch(() => {
        alert("Ocurrió error al cambiar la contraseña");
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="col-md-12 dialog">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.resetPassword}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
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
              <label htmlFor="password2">Repetir Contraseña</label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                value={this.state.password2}
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
                <span>Cambiar contraseña</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authentication;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(ResetPassword);
