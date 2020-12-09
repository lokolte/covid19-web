/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import "../../App.css";

import SideBarItem from "./sidebar-item.component";
import { logout } from "../../actions/auth";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.setSidebar = this.setSidebar.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      sidebar: false,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showDoctorBoard: user.account.role.name === "PROFESIONAL_MEDICO",
        showAdminBoard: user.account.role.name === "ADMIN",
        sidebar: false,
      });
    }
  }

  setSidebar(value) {
    this.setState({ sidebar: value });
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {
      currentUser,
      showDoctorBoard,
      showAdminBoard,
      sidebar,
    } = this.state;

    const showSidebar = () => this.setSidebar(!sidebar);

    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar navbar-expand navbar-dark bg-dark">
            {currentUser ? (
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            ) : (
              <></>
            )}
            <Link to={"/"} className="navbar-brand">
              Salud Total
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showDoctorBoard && (
                <li className="nav-item">
                  <Link to={"/doctor"} className="nav-link">
                    Panel del Médico
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Panel Administrador
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.account.person.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Salir
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </div>
          {currentUser ? (
            <nav
              className={
                sidebar
                  ? "nav-menu active bg-dark"
                  : "nav-menu inactive bg-dark"
              }
            >
              <ul
                className={
                  sidebar ? "nav-menu-items" : "nav-menu-items-centered"
                }
              >
                <SideBarItem active={sidebar} />
              </ul>
            </nav>
          ) : (
            <div />
          )}
        </IconContext.Provider>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navbar);
