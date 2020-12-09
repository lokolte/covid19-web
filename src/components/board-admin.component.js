/** @format */

import React, { Component } from "react";
import "../App.css";

import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Vista para el Administrador",
    };
  }

  // componentDidMount() {
  //   UserService.getPersons().then(
  //     (response) => {
  //       this.setState({
  //         content: response.data,
  //       });
  //     },
  //     (error) => {
  //       this.setState({
  //         content:
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString(),
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <div className="container content">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
