/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { saveItem } from "../../actions/forms";
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

class ItemAdd extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onChangeOrderLevel = this.onChangeOrderLevel.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.state = {
      title: "",
      subtitle: "",
      orderLevel: 0,
      type: "CHECK",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeSubtitle(e) {
    this.setState({
      subtitle: e.target.value,
    });
  }

  onChangeOrderLevel(e) {
    this.setState({
      orderLevel: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  isFormValid() {
    if (this.state.title == undefined || this.state.title.trim() == "") {
      return false;
    }
    if (this.state.subtitle == undefined || this.state.subtitle.trim() == "") {
      return false;
    }
    if (this.state.orderLevel == undefined) {
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
      title: this.state.title,
      subtitle: this.state.subtitle,
      type: this.state.type,
      orderLevel: this.state.orderLevel,
    };

    dispatch(saveItem(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/items";
      })
      .catch(() => {
        alert("Ocurrio un error");
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

    if (
      !isAdmin(currentUser.account.roles) &&
      !isCoordinator(currentUser.account.roles)
    ) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/items">Preguntas</a>
          <span>/ Agregar pregunta</span>
        </div>
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Agregar pregunta</h3>
          </header>

          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="name">
                Título <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={this.state.title}
                onChange={this.onChangeTitle}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">
                Subtítulo <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="lastname"
                value={this.state.subtitle}
                onChange={this.onChangeSubtitle}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">
                Orden <span class="required">*</span>
              </label>
              <Input
                type="number"
                className="form-control"
                name="lastname"
                value={this.state.orderLevel}
                onChange={this.onChangeOrderLevel}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipos">
                Tipo <span class="required">*</span>
              </label>
              <select id="tipos" name="tipos" onChange={this.onChangeType}>
                <option value="CHECK">CHECK</option>
                <option value="INPUT_TEXT">INPUT_TEXT</option>
              </select>
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
  return {
    user,
  };
}

export default connect(mapStateToProps)(withRouter(ItemAdd));
