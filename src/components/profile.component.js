/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../App.css";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    console.log("current user: ", currentUser);
    let p = currentUser.account.person;
    let name = p.name;
    let lastname = p.lastname;
    if (name == null || name == undefined) name = "";
    if (lastname == null || lastname == undefined) lastname = "";
    localStorage.setItem("userId", p.id);
    localStorage.setItem("userName", name + " " + lastname);

    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.account.email}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.jwt.substring(0, 20)} ...{" "}
            {currentUser.jwt.substr(currentUser.jwt.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.account.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.account.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            <li>{currentUser.account.role.name}</li>
          </ul>
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

export default connect(mapStateToProps)(Profile);
