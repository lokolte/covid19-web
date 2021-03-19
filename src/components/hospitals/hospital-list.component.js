/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getHospitals } from "../../actions/hospitals";
import HospitalService from "../../services/hospitals.service";

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
    console.log("eliminar !!!!");
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/hospitals/" + row.id + "/edit"}>Editar</a>
        <span> </span>
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.hospitals) {
      this.loadHospitals();
    }

    const columns = [
      { dataField: "id", text: "Id", sort: true },
      { dataField: "type", text: "Tipo", sort: true },
      { dataField: "province.name", text: "Region", sort: true },
      { dataField: "district.name", text: "Distrito", sort: true },
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
            <h3 className="center">Hospitales</h3>
          </header>

          <div>
            {this.state.hospitals ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.hospitals}
                columns={columns}
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
        </div>
      </div>
    );
  }
}
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
