/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getItems } from "../../actions/items";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.loadForms = this.loadForms.bind(this);

    this.state = {
      items: undefined,
      currentPage: 1,
      sizePerPage: 10,
    };
  }

  loadForms() {
    const { dispatch, items } = this.props;

    dispatch(getItems()).then(() => {
      this.setState({
        items: items,
      });
    });
  }

  verDetalle(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <a href={"/items/" + row.id + "/edit"}>Editar</a>
      </p>
    );
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.items) {
      this.loadForms();
    }

    const columns = [
      { dataField: "title", text: "Título", sort: true },
      { dataField: "subtitle", text: "Subtítulo", sort: true },
      { dataField: "type", text: "Tipo Respuesta", sort: true },
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
          <span>Preguntas</span>
        </div>
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Preguntas</h3>
          </header>

          <div>
            {this.state.items ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.items}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Buscar:</h6>
                    <SearchBar text="Buscar" {...props.searchProps} />
                    <ClearSearchButton text="Limpiar" {...props.searchProps} />
                    <a className="addBtn" href="/items/new">
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.authentication;
  const { items } = state.items;
  const { message } = state.message;
  return {
    user,
    items,
    message,
  };
}

export default connect(mapStateToProps)(ItemList);
