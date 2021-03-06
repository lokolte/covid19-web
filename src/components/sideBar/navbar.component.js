/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import "../../App.css";

import SideBarItem from "./sidebar-item.component";
import { logout } from "../../actions/auth";
import { isDoctor, isAdmin } from "../../actions/generalActions";

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
        showDoctorBoard: isDoctor(user.account.roles),
        showAdminBoard: isAdmin(user.account.roles),
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

    if (currentUser != undefined) {
      console.log("currentUser : ", currentUser.account.roles);
    }

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
                <SideBarItem
                  active={sidebar}
                  roles={currentUser.account.roles}
                />
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
