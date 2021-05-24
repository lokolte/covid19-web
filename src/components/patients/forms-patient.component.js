/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getForms, asignForms } from "../../actions/forms";
import { getPatient } from "../../actions/patients";
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
    this.onChangeDefault = this.onChangeDefault.bind(this);
    this.loadPatient = this.loadPatient.bind(this);
    this.loadForms = this.loadForms.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.state = {
      patient: undefined,
      name: "",
      seleccionado: undefined,
      formsPatient: undefined,
      forms: undefined,
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

  onChangeDefault(e) {
    this.setState({
      isDefault: !this.state.isDefault,
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
    var reduced = this.state.forms.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ forms: reduced });
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
    this.setState({ forms: [...this.state.forms, itemSeleccionado] });
    document.getElementById("asignados").selectedIndex = -1;
  };

  save(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;

    dispatch(asignForms(this.state.patient.id, this.state.asignados))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/assign-patients";
      })
      .catch(() => {
        alert("Ocurrio un error");
        this.setState({
          loading: false,
        });
      });
  }

  loadForms() {
    const { dispatch, location, forms } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getForms(id)).then(() => {
      this.setState({
        forms: forms,
      });
    });
  }

  loadPatient() {
    const { dispatch, patient, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getPatient(id)).then(() => {
      this.setState({
        patient: patient,
        asignados: patient?.forms,
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

    if (!this.state.forms) {
      this.loadForms();
    }

    if (!this.state.patient) {
      this.loadPatient();
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
            <a href="/assign-patients">Pacientes</a>
            <span>/ Asignar Formulario</span>
          </div>
          <div className="container">
            <header className="jumbotron">
              <h3 className="titulo">Formularios del paciente</h3>
            </header>

            <p>
              <strong>Paciente:</strong>{" "}
              {this.state.patient
                ? this.state.patient.name + " " + this.state.patient.lastname
                : this.state.name}
            </p>

            <Form
              onSubmit={this.save}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div>
                <div>
                  <label for="items">Formularios Disponibles</label> <br />
                  <select
                    size="5"
                    id="items"
                    name="items"
                    className="selectHospitals"
                    onChange={this.handleChange1}
                  >
                    {this.state.forms?.map(MakeItem)}
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
                  <label for="asignados">Formularios Asignados</label> <br />
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
            <a href="/assign-patients">Pacientes</a>
            <span>/ Asignar Formulario</span>
          </div>
          <div className="container">
            <header className="jumbotron">
              <h3 className="titulo">Formularios del paciente</h3>
            </header>

            <p>
              <strong>Paciente:</strong>{" "}
              {this.state.patient
                ? this.state.patient.name + " " + this.state.patient.lastname
                : this.state.name}
            </p>

            <Form
              onSubmit={this.save}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div class="Row">
                <div class="Column">
                  <label for="items">Formularios Disponibles</label> <br />
                  <select
                    size="15"
                    id="items"
                    name="items"
                    className="selectHospitals"
                    onChange={this.handleChange1}
                  >
                    {this.state.forms?.map(MakeItem)}
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
                  <label for="asignados">Formularios Asignados</label> <br />
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
  const { forms } = state.forms;
  const { patient } = state.patient;
  const { formsPatient } = state.formsPatient;
  return {
    user,
    forms,
    patient,
    formsPatient,
  };
}

export default connect(mapStateToProps)(withRouter(FormsEdit));
