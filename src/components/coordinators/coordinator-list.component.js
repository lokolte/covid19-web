/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCoordinators } from "../../actions/coordinators";
import DoctorService from "../../services/doctor.service";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { API_URL } from "../../config/env.config";

class Coordinators extends Component {
  constructor(props) {
    super(props);
    this.loadCoordinators = this.loadCoordinators.bind(this);
    this.eliminar = this.eliminar.bind(this);

    this.state = {
      coordinators: undefined,
      currentPage: 1,
      sizePerPage: 10,
      selectedFile: null,
    };
  }

  loadCoordinators() {
    const { dispatch, coordinators } = this.props;

    dispatch(getCoordinators()).then(() => {
      this.setState({
        coordinators: coordinators,
      });
    });
  }

  eliminar(id) {
    console.log("eliminar usuario : ", id);
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/coordinators/" + row.id + "/view"}>Ver</a>
        <span> </span>
        <a href={"/coordinators/" + row.id + "/edit"}>Editar</a>
        <span> </span>
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.coordinators) {
      this.loadCoordinators();
    }

    const columns = [
      { dataField: "document", text: "Nro. Documento", sort: true },
      { dataField: "name", text: "Nombre completo", sort: true },
      {
        dataField: "actions",
        text: "Acciones",
        sort: false,
        isDummyField: true,
        csvExport: false,
        formatter: this.verDetalle,
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
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Coordinadores</h3>
          </header>

          <div>
            {this.state.coordinators ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.coordinators}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar los coordinadores:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />
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
          <br />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.authentication;
  const { coordinators } = state.coordinators;
  const { message } = state.message;
  return {
    user,
    coordinators,
    message,
  };
}

export default connect(mapStateToProps)(Coordinators);
