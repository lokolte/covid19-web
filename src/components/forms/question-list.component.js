/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getQuestions } from "../../actions/questions";
// import FormItem from "./form-item.component";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.loadQuestions = this.loadQuestions.bind(this);

    this.state = {
      questions: undefined,
      currentPage: 1,
      sizePerPage: 10,
    };
  }

  loadQuestions() {
    const { dispatch, location, questions } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getQuestions(id)).then(() => {
      this.setState({
        questions: questions,
      });
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.questions) {
      this.loadQuestions();
    }

    const columns = [
      { dataField: "title", text: "Título", sort: true },
      { dataField: "subtitle", text: "Subtítulo", sort: true },
      { dataField: "type", text: "Tipo Respuesta", sort: true },
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
          <a href="/forms">Formularios </a>
          <span> / Preguntas</span>
        </div>
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Preguntas</h3>
          </header>

          <div>
            {this.state.questions ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.questions}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar las preguntas:</h6>
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
  const { questions } = state.questions;
  const { message } = state.message;
  return {
    user,
    questions,
    message,
  };
}

export default connect(mapStateToProps)(Questions);
