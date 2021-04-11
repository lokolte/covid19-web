/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getHospitals } from "../../actions/hospitals";
import HospitalService from "../../services/hospitals.service";
import { isCoordinator, isAdmin } from "../../actions/generalActions";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Hospitals extends Component {
  constructor(props) {
    super(props);
    this.loadHospitals = this.loadHospitals.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      hospitals: undefined,
      currentPage: 1,
      sizePerPage: 10,
      selectedFile: null,
      hospitalSeleccionado: null,
    };
  }

  loadHospitals() {
    const { dispatch, hospitals } = this.props;

    dispatch(getHospitals()).then(() => {
      this.setState({
        hospitals: hospitals,
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

    HospitalService.importarDatos(formData).then(
      alert("Cargado Exitosamente!")
    );
  };

  delete() {
    HospitalService.delete(this.state.hospitalSeleccionado).then(
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
      hospitalSeleccionado: id,
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
        <a href={"/hospitals/" + row.id + "/edit"}>Editar</a>
        <span> </span>
        <ItemRow key={row.id} patient={row} onDelete={formatExtraData} />
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    const deleteHospital = (id) => {
      this.openPopup(id);
    };

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.hospitals) {
      this.loadHospitals();
    }

    const columnsDoctor = [
      { dataField: "code", text: "Código", sort: true },
      { dataField: "type", text: "Tipo", sort: true },
      { dataField: "district.province.name", text: "Region", sort: true },
      { dataField: "district.name", text: "Distrito", sort: true },
    ];

    const columnsAdmin = [
      { dataField: "code", text: "Código", sort: true },
      { dataField: "type", text: "Tipo", sort: true },
      { dataField: "district.province.name", text: "Region", sort: true },
      { dataField: "district.name", text: "Distrito", sort: true },
      {
        dataField: "actions",
        text: "Acciones",
        sort: false,
        isDummyField: true,
        csvExport: false,
        formatExtraData: deleteHospital,
        formatter: this.verDetalle,
      },
    ];

    let test = isAdmin(currentUser.account.roles) ? "es admin" : "no es admin";
    console.log("roles : ", test);

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

    return isAdmin(currentUser.account.roles) ? (
      <div className="content">
        <div className="navigation-bar">
          <span>Hospitales</span>
        </div>

        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Hospitales</h3>
          </header>

          <div>
            {this.state.hospitals ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.hospitals}
                columns={columnsAdmin}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar los hospitales:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />
                    <a className="addBtn" href="/hospitals/new">
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
            <h3>Importar datos de hospitales desde la web del MSPBS</h3>
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
              <p>Esta seguro que desea eliminar el hospital ?</p>
              <div>
                <button
                  onClick={this.delete}
                  id="eliminarHospital"
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
    ) : (
      <div className="content">
        <div className="navigation-bar">
          <span>Hospitales</span>
        </div>

        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Hospitales</h3>
          </header>

          <div>
            {this.state.hospitals ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.hospitals}
                columns={columnsDoctor}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar los hospitales:</h6>
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
  const { hospitals } = state.hospitals;
  const { message } = state.message;
  return {
    user,
    hospitals,
    message,
  };
}

export default connect(mapStateToProps)(Hospitals);
