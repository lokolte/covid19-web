/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAnswers } from "../../actions/answers";
// import FormItem from "./form-item.component";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Answers extends Component {
  constructor(props) {
    super(props);
    this.loadAnswers = this.loadAnswers.bind(this);

    this.state = {
      answers: undefined,
      currentPage: 1,
      sizePerPage: 10,
    };
  }

  loadAnswers() {
    const { dispatch, answers } = this.props;

    const answerId = this.props.match.params.id;

    dispatch(getAnswers(answerId)).then(() => {
      this.setState({
        answers: answers,
      });
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.answers) {
      this.loadAnswers();
    }

    const columns = [
      { dataField: "id", text: "Id", sort: true },
      { dataField: "form.title", text: "Formulario", sort: true },
      { dataField: "answerDate", text: "Fecha", sort: true },
    ];

    const defaultSorted = [
      {
        dataField: "answerDate",
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
            <h3 className="center">Consultas</h3>
          </header>

          <div>
            {this.state.answers ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.answers}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar los formularios:</h6>
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
  const { answers } = state.answers;
  const { message } = state.message;
  return {
    user,
    answers,
    message,
  };
}

export default connect(mapStateToProps)(Answers);
