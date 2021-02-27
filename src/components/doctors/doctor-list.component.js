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

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.loadDoctors = this.loadDoctors.bind(this);

    this.state = {
      doctors: undefined,
      currentPage: 1,
      sizePerPage: 10,
      selectedFile: null,
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

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/doctors/" + row.id + "/view"}>Ver</a>
        <span> </span>
        <a href={"/doctors/" + row.id + "/edit"}>Editar</a>
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
        </div>
      </div>
    );
  }
}
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
