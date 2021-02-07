/** @format */

import React, { Component } from "react";
import "../App.css";

// import UserService from "../services/user.service";

export default class BoardDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Vista para el Doctor",
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
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
      </div>
    );
  }
}
