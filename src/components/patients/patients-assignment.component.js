/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPatients } from "../../actions/patients";
import { isDoctor, isAdmin, isCoordinator } from "../../actions/generalActions";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class PatientsAssignment extends Component {
  constructor(props) {
    super(props);

    this.loadPatients = this.loadPatients.bind(this);

    this.verDetalle = this.verDetalle.bind(this);

    this.state = {
      patients: undefined,
      currentPage: 1,
      sizePerPage: 10,
      content: "Este es el home page",
    };
  }

  loadPatients() {
    const { dispatch, patients } = this.props;

    dispatch(getPatients()).then(() => {
      this.setState({
        patients: patients,
      });
    });
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    const answerId = this.state.patients?.filter((x) => x.id == row.id)[0];
    return <a href={"/patients/" + row.id + "/assignment"}>{row.doctor}</a>;
  }

  verFormularios(cell, row, rowIndex, formatExtraData) {
    return <a href={"/patients/" + row.id + "/forms"}>Formularios</a>;
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

    if (!this.state.patients) {
      this.loadPatients();
    }

    const columns = [
      { dataField: "name", text: "Nombre", sort: true },
      { dataField: "phone", text: "Telefono", sort: true },
      {
        dataField: "actions",
        text: "Medico asignado",
        sort: false,
        isDummyField: true,
        csvExport: false,
        formatter: this.verDetalle,
      },
      {
        dataField: "actions",
        text: "Formularios",
        sort: false,
        isDummyField: true,
        csvExport: false,
        formatter: this.verFormularios,
      },
    ];

    const defaultSorted = [
      {
        dataField: "orderLevel",
        order: "desc",
      },
    ];

    const pagination = paginationFactory({
      page: this.state.currentPage,
      sizePerPage: this.state.sizePerPage,
      lastPageText: ">>",
      firstPageText: "<<",
      nextPageText: ">",
      prePageText: "<",
      showTotal: true,
      alwaysShowAllBtns: true,
      onPageChange: function (page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
      onSizePerPageChange: function (page, sizePerPage) {
        console.log("page", page);
        console.log("sizePerPage", sizePerPage);
      },
    });

    const { SearchBar, ClearSearchButton } = Search;

    return (
      <div className="content">
        <div className="navigation-bar">
          <span>Pacientes</span>
        </div>

        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Asignación de Pacientes</h3>
          </header>

          <div>
            {this.state.patients ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.patients}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Buscar:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />
                    <hr />
                    <BootstrapTable
                      className="dark"
                      defaultSorted={defaultSorted}
                      pagination={pagination}
                      {...props.baseProps}
                    />
                  </div>
                )}
              </ToolkitProvider>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { patients } = state.patients;
  const { message } = state.message;
  return {
    user,
    patients,
    message,
  };
}

export default connect(mapStateToProps)(PatientsAssignment);
