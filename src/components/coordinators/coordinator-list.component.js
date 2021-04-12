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
    this.delete = this.delete.bind(this);

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

  delete() {
    DoctorService.delete(this.state.rowSelected).then(
      () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        window.location.reload();
      },
      () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert("Ocurrio un error al ejecutar la operación");
      }
    );
  }

  openPopup(id) {
    this.setState({
      rowSelected: id,
    });
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/coordinators/" + row.id + "/view"}>Ver</a>
        <span> </span>
        <a href={"/coordinators/" + row.id + "/edit"}>Editar</a>
        <span> </span>
        <ItemRow key={row.id} patient={row} onDelete={formatExtraData} />
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

    const deleteRow = (id) => {
      this.openPopup(id);
    };

    const columns = [
      { dataField: "document", text: "Nro. Documento", sort: true },
      { dataField: "name", text: "Nombre completo", sort: true },
      {
        dataField: "actions",
        text: "Acciones",
        sort: false,
        isDummyField: true,
        csvExport: false,
        formatExtraData: deleteRow,
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
        <div className="navigation-bar">
          <span>Coordinadores</span>
        </div>
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
                    <h6>Buscar:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />
                    <a className="addBtn" href="/coordinators/new">
                      Agregar
                    </a>
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
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <p>Esta seguro que desea eliminar el registro ?</p>
              <div>
                <button
                  onClick={this.delete}
                  id="deleteRow"
                  style={{ borderRadius: "3px", border: "1px solid #808080" }}
                >
                  Aceptar
                </button>
                <button
                  onClick={this.close}
                  style={{ borderRadius: "3px", border: "1px solid #808080" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ItemRow = ({
  patient: { id, name, phone, when, toRespond, seen, active },
  onDelete,
}) => (
  <a
    href={"#!"}
    onClick={() => {
      onDelete(id);
    }}
  >
    Eliminar
  </a>
);

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
