/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getPatients } from "../../actions/patientsDoctor";
import { getMessages, sendMessage } from "../../actions/messagesPatient";
import PersonService from "../../services/person.service";

import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import "./css/message.css";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.loadPatients = this.loadPatients.bind(this);
    this.loadMessages = this.loadMessages.bind(this);

    this.state = {
      patientsDoctor: undefined,
      messages: undefined,
      idPatient: undefined,
    };
  }

  loadPatients() {
    const { dispatch, patientsDoctor } = this.props;
    dispatch(getPatients(localStorage.getItem("userId"))).then(() => {
      this.setState({
        patientsDoctor: patientsDoctor,
      });
    });
  }

  addClassName(data) {
    let tmp = data;
    let isReceiver = tmp["receiver"];
    if (isReceiver) tmp["className"] = "cardMessageReceiver";
    else tmp["className"] = "cardMessage";
    return tmp;
  }

  processMessage(messages) {
    return messages.map(this.addClassName);
  }

  loadMessages(patient) {
    const { dispatch, messages } = this.props;
    this.state.idPatient = patient;
    document.getElementById("messageText").classList.remove("invisible");
    document.getElementById("sendMessageBtn").classList.remove("invisible");

    PersonService.getMessages(localStorage.getItem("userId"), patient).then(
      (data) => {
        this.setState({
          messages: this.processMessage(data.messages),
        });
      },
      (error) => {}
    );
  }

  sendMessage() {
    const { dispatch } = this.props;
    let mensaje = document.getElementById("messageText").value;
    document.getElementById("messageText").value = "";

    dispatch(
      sendMessage(localStorage.getItem("userId"), this.state.idPatient, mensaje)
    ).then(() => {
      this.setState({});
    });

    if (this.state.messages == undefined) this.state.messages = [];
    this.setState({
      messages: [
        ...this.state.messages,
        {
          id: new Date().getTime(),
          messageText: mensaje,
          className: "cardMessage",
          person: { name: localStorage.getItem("userName") },
        },
      ],
    });
  }

  getHora(fecha) {
    if (fecha == null || fecha == undefined) {
      let d = new Date();
      return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    } else {
      let hora = fecha.substr(11, 8);
      return hora;
    }
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.patientsDoctor) {
      this.loadPatients();
    }

    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Mensajes</h3>
          </header>
        </div>

        <div>
          <MDBCard className="grey lighten-3 chat-room">
            <MDBCardBody>
              <MDBRow className="px-lg-2 px-2">
                <MDBCol
                  md="6"
                  xl="4"
                  className="px-0 mb-4 mb-md-0 scrollable-friends-list"
                >
                  <h6 className="font-weight-bold mb-3 text-lg-left">
                    Pacientes
                  </h6>
                  <div className="white z-depth-1 p-3 friend-list-scrollable">
                    <MDBListGroup className="friend-list">
                      {this.state.patientsDoctor?.map((friend) => (
                        <Friend key={friend.id} friend={friend} thiz={this} />
                      ))}
                    </MDBListGroup>
                  </div>
                </MDBCol>
                <MDBCol
                  md="6"
                  xl="8"
                  className="pl-md-3 mt-4 mt-md-0 px-lg-auto"
                >
                  <div className="scrollable-chat">
                    <MDBListGroup className="list-unstyled pl-3 pr-3">
                      {this.state.messages?.map((message) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          thiz={this}
                        />
                      ))}
                    </MDBListGroup>
                  </div>
                  <div className="form-group basic-textarea">
                    <textarea
                      className="form-control pl-2 my-0 invisible"
                      id="messageText"
                      rows="3"
                      placeholder="Type your message here..."
                    />
                    <MDBBtn
                      id="sendMessageBtn"
                      color="info"
                      onClick={() => {
                        this.sendMessage();
                      }}
                      rounded
                      size="sm"
                      className="float-right mt-4 invisible"
                    >
                      Send
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  }
}

const Friend = ({
  friend: { id, name, phone, when, toRespond, seen, active },
  thiz,
}) => (
  <MDBListGroupItem
    href="#!"
    onClick={() => {
      thiz.loadMessages(id);
    }}
    className="d-flex justify-content-between p-2 border-light"
    style={{ backgroundColor: active ? "#eeeeee" : "" }}
  >
    <div style={{ fontSize: "0.95rem" }}>
      <strong>{name}</strong>
      <p className="text-muted">{phone}</p>
    </div>
    <div>
      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        {when}
      </p>
      {seen ? (
        <span className="text-muted float-right">
          <MDBIcon className="fa-check" aria-hidden="true" />
        </span>
      ) : toRespond ? (
        <MDBBadge color="danger" className="float-right">
          {toRespond}
        </MDBBadge>
      ) : (
        <span className="text-muted float-right">
          <MDBIcon icon="reply" aria-hidden="true" />
        </span>
      )}
    </div>
  </MDBListGroupItem>
);

const ChatMessage = ({
  message: { person, messageDate, messageText, className },
  thiz,
}) => (
  <MDBCard className={className}>
    <MDBCardBody>
      <div>
        <strong className="primary-font">{person.name}</strong>
        <small className="pull-right text-muted">
          <i className="far fa-clock" /> {thiz.getHora(messageDate)}
        </small>
      </div>
      <hr />
      <p className="mb-0">{messageText}</p>
    </MDBCardBody>
  </MDBCard>
);

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { patientsDoctor } = state.patientsDoctor;
  const { message } = state.message;
  const { messages } = state.messages;
  return {
    user,
    patientsDoctor,
    message,
    messages,
  };
}

export default connect(mapStateToProps)(ChatPage);
