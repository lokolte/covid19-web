/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllDoctors } from "../../actions/doctors";
import DoctorService from "../../services/doctor.service";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { API_URL } from "../../config/env.config";

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.loadDoctors = this.loadDoctors.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      doctors: undefined,
      currentPage: 1,
      sizePerPage: 10,
      selectedFile: null,
      rowSelected: null,
    };
  }

  loadDoctors() {
    const { dispatch, doctors } = this.props;

    dispatch(getAllDoctors()).then(() => {
      this.setState({
        doctors: doctors,
      });
    });
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    DoctorService.importarDatos(formData).then(alert("Cargado Exitosamente!"));
  };

  downloadFile = () => {
    DoctorService.download().then((data) => {
      var blob = new Blob([data], {
        type: "application/vnd.ms-excel",
      });
      var url = URL.createObjectURL(blob);
      var w = window.open(url);
    });
  };

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
        <a href={"/doctors/" + row.id + "/view"}>Ver</a>
        <span> </span>
        <a href={"/doctors/" + row.id + "/edit"}>Editar</a>
        <span> </span>
        <ItemRow key={row.id} patient={row} onDelete={formatExtraData} />
        <span> </span>
        <a href={"/doctors/" + row.id + "/asign-hospital"}>
          Asignar hospitales
        </a>
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.doctors) {
      this.loadDoctors();
    }

    const jwt = JSON.parse(localStorage.getItem("user")).jwt;
    const url = API_URL + "/accounts/doctors/export?jwt=" + jwt;

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
          <span>Doctores</span>
        </div>

        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Doctores</h3>
          </header>

          <div>
            {this.state.doctors ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.doctors}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar los doctores:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />

                    <a href={url}>Descargar</a>
                    <a className="addBtn" href="/doctors/new">
                      Agregar
                    </a>
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
          <br />
          <div style={{ marginBottom: "25px" }}>
            <h3>Importar datos</h3>
            <div>
              <input type="file" onChange={this.onFileChange} />
              <button
                onClick={this.onFileUpload}
                style={{ borderRadius: "3px", border: "1px solid #808080" }}
              >
                Enviar
              </button>
            </div>
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
  const { doctors } = state.doctors;
  const { message } = state.message;
  return {
    user,
    doctors,
    message,
  };
}

export default connect(mapStateToProps)(Doctors);
