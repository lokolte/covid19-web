/** @format */

import React, { Component } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Este es el home page",
    };
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">{this.state.content}</h3>
          </header>
        </div>
      </div>
    );
  }
}
