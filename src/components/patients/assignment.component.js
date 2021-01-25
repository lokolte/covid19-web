/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDoctors } from "../../actions/doctors";
import { saveAssignment } from "../../actions/doctors";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Assignment extends Component {
  constructor(props) {
    super(props);
    this.loadDoctors = this.loadDoctors.bind(this);
    this.saveAssignment = this.saveAssignment.bind(this);

    this.state = {
      doctors: undefined,
      currentPage: 1,
      sizePerPage: 10,
      selected: [],
      doctorId: undefined,
    };
  }

  loadDoctors() {
    const { dispatch, doctors } = this.props;
    const { personId } = this.props.match.params;

    dispatch(getDoctors(personId)).then(() => {
      this.setState({
        doctors: doctors,
      });
    });
  }

  saveAssignment() {
    const { dispatch } = this.props;
    const { personId } = this.props.match.params;
    dispatch(saveAssignment(personId, this.state.doctorId)).then(() => {
      window.location.replace("/assign-patients");
    });
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
      { dataField: "name", text: "Medico", sort: true },
      { dataField: "phone", text: "Telefono", sort: true },
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

    //SelectRow
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      clickToEdit: true,
      classes: "selection-row",
      selected: this.state.selected,
      onSelect: (row, isSelect, rowIndex, e) => {
        this.state.doctorId = row.id;
      },
    };

    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Asignación</h3>
          </header>
        </div>

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
                  <h6>Ingrese algo para filtrar los medicos:</h6>
                  <SearchBar text="Buscar" {...props.searchProps} />
                  <ClearSearchButton text="Limpiar" {...props.searchProps} />
                  <hr />
                  <BootstrapTable
                    className="dark"
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    selectRow={selectRow}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
          ) : (
            <></>
          )}
        </div>
        <button type="button" onClick={this.saveAssignment}>
          Guardar asignación
        </button>
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

export default connect(mapStateToProps)(Assignment);
