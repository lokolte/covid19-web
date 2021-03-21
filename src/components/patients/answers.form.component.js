/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAnswers } from "../../actions/answersForm";
import { getPatient } from "../../actions/patients";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class AnswersForm extends Component {
  constructor(props) {
    super(props);
    this.loadAnswers = this.loadAnswers.bind(this);

    this.state = {
      answersItems: undefined,
      patient: undefined,
      currentPage: 1,
      sizePerPage: 10,
    };
  }

  loadAnswers() {
    const { dispatch, answers } = this.props;
    const { formId } = this.props.match.params;
    const { personId } = this.props.match.params;

    dispatch(getAnswers(formId, personId)).then(() => {
      let answersItems = [];
      answers?.map((answer) =>
        answer.answers.map((answerItem) => {
          answerItem.answerDate = answer.date;
          if (
            answerItem.answerText == null &&
            answerItem.item.type == "CHECK"
          ) {
            answerItem.answerText = "Si";
          }
          answersItems.push(answerItem);
        })
      );
      this.setState({
        answersItems: answersItems,
      });
    });
  }

  loadPatient() {
    const { dispatch, patient, location } = this.props;

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    dispatch(getPatient(id)).then(() => {
      this.setState({
        patient: patient,
      });
    });
  }

  render() {
    const { user: currentUser, location } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.answersItems) {
      this.loadAnswers();
    }

    if (!this.state.patient) {
      this.loadPatient();
    }

    const columns = [
      { dataField: "item.title", text: "Preguntas respondidas", sort: true },
      { dataField: "answerText", text: "Respuesta", sort: true },
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

    let path = location.pathname;
    let tokens = path.split("/");
    let id = tokens[2];

    const urlForms = "/patients/" + id + "/forms";

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/patients">Pacientes </a>
          <a href={urlForms}>/ Formularios</a>
          <span>/ Respuestas Formulario</span>
        </div>
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Respuestas Formulario</h3>
          </header>

          <p>
            <strong>Paciente:</strong>{" "}
            {this.state.patient
              ? this.state.patient.name + " " + this.state.patient.lastname
              : this.state.name}
          </p>

          <div>
            {this.state.answersItems ? (
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.answersItems}
                columns={columns}
                search={true}
              >
                {(props) => (
                  <div>
                    <h6>Ingrese algo para filtrar las respuestas:</h6>
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
  const { patient } = state.patient;
  return {
    user,
    answers,
    message,
    patient,
  };
}

export default connect(mapStateToProps)(AnswersForm);
