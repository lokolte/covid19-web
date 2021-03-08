/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getHospitals } from "../../actions/hospitals";
import { getHospitalsDoctor } from "../../actions/hospitals-doctor";
import { saveHospitals } from "../../actions/doctors";

import "../../App.css";
import "./style.css";

class AsignHospital extends Component {
  constructor(props) {
    super(props);
    this.loadHospitals = this.loadHospitals.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.state = {
      hospitals: undefined,
      asignados: undefined,
      seleccionado: undefined,
      desSeleccionado: undefined,
    };
  }

  save(e) {
    e.preventDefault();
    const { dispatch, asignados, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    this.setState({
      loading: true,
    });

    dispatch(saveHospitals(id, this.state.asignados))
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

  loadHospitals() {
    const { dispatch, hospitals, location } = this.props;
    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getHospitals(id)).then(() => {
      this.setState({
        hospitals: hospitals,
      });
    });
  }

  loadAsignado() {
    const { dispatch, location, asignados } = this.props;
    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getHospitalsDoctor(id)).then(() => {
      this.setState({
        asignados: asignados,
      });
    });
  }

  addItem = () => {
    if (this.state.asignados == undefined) {
      this.setState({ asignados: [] });
    }
    var idSeleccionado = this.state.seleccionado;
    if (idSeleccionado == undefined) return;
    var itemSeleccionado = null;
    var reduced = this.state.hospitals.reduce(function (filtered, item) {
      if (item.id == idSeleccionado) {
        itemSeleccionado = item;
      } else {
        filtered.push(item);
      }
      return filtered;
    }, []);
    if (itemSeleccionado == null) return;
    this.setState({ hospitals: reduced });
    this.setState({ asignados: [...this.state.asignados, itemSeleccionado] });
    document.getElementById("hospitals").selectedIndex = -1;
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
    this.setState({ hospitals: [...this.state.hospitals, itemSeleccionado] });
    document.getElementById("asignados").selectedIndex = -1;
  };

  handleChange(e) {
    this.setState({ seleccionado: e.target.value });
  }

  handleChange2(e) {
    this.setState({ desSeleccionado: e.target.value });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.hospitals) {
      this.loadHospitals();
    }

    if (!this.state.asignados) {
      this.loadAsignado();
    }

    var Data = ["this", "example", "isnt", "funny"],
      MakeItem = function (X) {
        return (
          <option value={X?.id}>
            {X?.id} - {X?.name}
          </option>
        );
      };

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/doctors">Doctores </a>
          <span>/ Asignación de hospitales</span>
        </div>
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Asignación de hospitales</h3>
          </header>

          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div class="Row">
              <div class="Column">
                <label for="hospitals">Hospitales</label> <br />
                <select
                  size="15"
                  id="hospitals"
                  name="hospitals"
                  className="selectHospitals"
                  onChange={this.handleChange}
                >
                  {this.state.hospitals?.map(MakeItem)}
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
                <label for="asignados">Hospitales Asignados</label> <br />
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

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { hospitals } = state.hospitals;
  const { asignados } = state.asignados;
  return {
    user,
    hospitals,
    asignados,
  };
}

export default connect(mapStateToProps)(withRouter(AsignHospital));
