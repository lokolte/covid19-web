/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { create } from "../../actions/forms";
import { getForm } from "../../actions/forms";
import { getItems } from "../../actions/items";
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

class FormsEdit extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onChangeOrderLevel = this.onChangeOrderLevel.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.state = {
      title: "",
      subtitle: "",
      orderLevel: 0,
      type: "CHECK",
      form: undefined,
      seleccionado: undefined,
      items: undefined,
      asignados: [],
      itemSeleccionado: undefined,
      desSeleccionado: undefined,
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

  handleChange1(e) {
    this.setState({ itemSeleccionado: e.target.value });
  }

  handleChange2(e) {
    this.setState({ desSeleccionado: e.target.value });
  }

  addItem = () => {
    if (this.state.asignados == undefined) {
      this.setState({ asignados: [] });
    }
    var idSeleccionado = this.state.itemSeleccionado;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.items.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ items: reduced });
    this.setState({ asignados: [...this.state.asignados, itemSeleccionado] });
    document.getElementById("items").selectedIndex = -1;
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
    this.setState({ items: [...this.state.items, itemSeleccionado] });
    document.getElementById("asignados").selectedIndex = -1;
  };

  loadData() {
    const { dispatch, form, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getForm(id)).then(() => {
      this.setState({
        form: form,
        title: form?.title,
        subtitle: form?.subtitle,
        orderLevel: form?.orderLevel,
        asignados: form?.itemsForm,
      });
    });
  }

  loadItems() {
    const { dispatch, location, items } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getItems(id)).then(() => {
      this.setState({
        items: items,
      });
    });
  }

  save(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch } = this.props;

    let data = {
      id: this.state.form.id,
      title: this.state.title,
      subtitle: this.state.subtitle,
      orderLevel: this.state.orderLevel,
      itemsForm: this.state.asignados,
    };

    dispatch(create(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/forms";
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

    if (!this.state.form) {
      this.loadData();
    }

    if (!this.state.items) {
      this.loadItems();
    }

    var MakeItem = function (X) {
      return (
        <option value={X?.id}>
          {X?.id} - {X?.title}
        </option>
      );
    };

    var widthScreen = window.screen.width;

    if (widthScreen < 600) {
      return (
        <div className="content">
          <div className="navigation-bar">
            <a href="/forms">Formularios</a>
            <span>/ Agregar Formulario</span>
          </div>
          <div className="container">
            <header className="jumbotron">
              <h3 className="titulo">Agregar Formulario</h3>
            </header>

            <Form
              onSubmit={this.save}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Título</label>
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
                <label htmlFor="lastname">Subtítulo</label>
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
                <label htmlFor="lastname">Orden</label>
                <Input
                  type="number"
                  className="form-control"
                  name="lastname"
                  value={this.state.orderLevel}
                  onChange={this.onChangeOrderLevel}
                  validations={[required]}
                />
              </div>

              <div>
                <div>
                  <label for="items">Items Disponibles</label> <br />
                  <select
                    size="5"
                    id="items"
                    name="items"
                    className="selectHospitals"
                    onChange={this.handleChange1}
                  >
                    {this.state.items?.map(MakeItem)}
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
                  <label for="asignados">Items Asignados</label> <br />
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
            <a href="/forms">Formularios</a>
            <span>/ Agregar Formulario</span>
          </div>
          <div className="container">
            <header className="jumbotron">
              <h3 className="titulo">Agregar Formulario</h3>
            </header>

            <Form
              onSubmit={this.save}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Título</label>
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
                <label htmlFor="lastname">Subtítulo</label>
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
                <label htmlFor="lastname">Orden</label>
                <Input
                  type="number"
                  className="form-control"
                  name="lastname"
                  value={this.state.orderLevel}
                  onChange={this.onChangeOrderLevel}
                  validations={[required]}
                />
              </div>

              <div class="Row">
                <div class="Column">
                  <label for="items">Items Disponibles</label> <br />
                  <select
                    size="15"
                    id="items"
                    name="items"
                    className="selectHospitals"
                    onChange={this.handleChange1}
                  >
                    {this.state.items?.map(MakeItem)}
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
                  <label for="asignados">Items Asignados</label> <br />
                  <select
                    size="15"
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
  const { form } = state.form;
  const { items } = state.items;
  return {
    user,
    form,
    items,
  };
}

export default connect(mapStateToProps)(withRouter(FormsEdit));
