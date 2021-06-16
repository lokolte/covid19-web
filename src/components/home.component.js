/** @format */

import React, { Component } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Presentación de la aplicación</h3>
          </header>
          <div>
            <p>
              Uno de los sectores más vulnerables de la población ante la
              pandemia del COVID-19 son las personas portadoras de enfermedades
              crónicas. La mayoría de estos pacientes requieren especialistas en
              hospitales referenciados. Identificar y georreferenciar a estos
              pacientes es fundamental para la Salud Pública. Este trabajo tiene
              el objetivo de desarrollar, implementar y evaluar una aplicación
              para dispositivos móviles para detectar y realizar el seguimiento
              georreferenciado por parte del Ministerio de Salud Pública y
              Bienestar Social (MSPyBS) de Paraguay a pacientes portadores de
              enfermedades crónicas con riesgo de COVID-19. La utilización de la
              aplicación tiene potencial para beneficiar a los pacientes
              crónicos en cuanto a posibilidad de acceder a la medicación y
              conseguir una atención primaria por parte de especialistas sin
              necesidad de movilizarse a los centros de salud.
            </p>
            <p>
              Para descargar la aplicación haga click{" "}
              <a href="/assets/app.apk">aquí.</a>
            </p>
            <p>
              Para para mas información vea las{" "}
              <a href="/conditions">condiciones de servicio.</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
