/** @format */

import React, { Component } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export default class Conditions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">
              DECLARACIÓN DE CONSENTIMIENTO DE PARTICIPACIÓN
            </h3>
          </header>
          <div>
            <p>
              Declaro por este medio mi aceptación a participar voluntariamente
              de las Pruebas Piloto del Proyecto de investigación "PINV20-292
              Detección y seguimiento georreferenciado de pacientes de alto
              riesgo portadores de enfermedades crónicas con riesgo de COVID-19
              por medio de una aplicación móvil".
            </p>
            <p>
              La información recolectada será utilizada exclusivamente de forma
              estadística y no se divulgará mi identidad y datos personales a
              terceras personas fuera del grupo de investigación.
            </p>
            <p>
              También declaro que he sido informada del objetivo de esta
              investigación.
            </p>
            <p>
              Al final de mi participación, acepto completar un cuestionario de
              satisfacción del usuario en forma anónima.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
