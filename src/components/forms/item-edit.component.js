/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getItem } from "../../actions/items";
import { updateItem } from "../../actions/forms";
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

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
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
      item: undefined,
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

  loadData() {
    const { dispatch, item, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getItem(id)).then(() => {
      this.setState({
        item: item,
        title: item?.title,
        subtitle: item?.subtitle,
        type: item?.type,
        orderLevel: item?.orderLevel,
      });
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

    dispatch(updateItem(this.state.item.id, data))
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

    if (!this.state.item) {
      this.loadData();
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
                value={
                  this.state.item ? this.state.item.title : this.state.title
                }
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
                value={
                  this.state.item
                    ? this.state.item.subtitle
                    : this.state.subtitle
                }
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
                value={
                  this.state.item
                    ? this.state.item.orderLevel
                    : this.state.orderLevel
                }
                onChange={this.onChangeOrderLevel}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="provinces">
                Tipo <span class="required">*</span>
              </label>
              <select
                id="provinces"
                name="provinces"
                onChange={this.onChangeType}
                value={this.state.item ? this.state.item.type : this.state.type}
              >
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
  const { item } = state.item;
  return {
    user,
    item,
  };
}

export default connect(mapStateToProps)(withRouter(ItemEdit));
