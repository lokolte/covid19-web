/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getForms } from "../../actions/forms";
// import FormItem from "./form-item.component";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.loadForms = this.loadForms.bind(this);

    this.state = {
      forms: undefined,
      currentPage: 1,
      sizePerPage: 10,
    };
  }

  loadForms() {
    const { dispatch, forms } = this.props;

    dispatch(getForms()).then(() => {
      this.setState({
        forms: forms,
      });
    });
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/forms/" + row.id + "/answers"}>Ver</a>
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.forms) {
      this.loadForms();
    }

    const columns = [
      { dataField: "title", text: "Título", sort: true },
      { dataField: "description", text: "Descripción", sort: true },
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
        <div className="navigation-bar">
          <span>Formularios</span>
        </div>
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Formularios</h3>
          </header>

          <div>
            {this.state.forms ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.forms}
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
  const { forms } = state.forms;
  const { message } = state.message;
  return {
    user,
    forms,
    message,
  };
}

export default connect(mapStateToProps)(Forms);
