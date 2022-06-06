import React, {Component} from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardBackend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      saveMessage: "",
    };

    this.produciRegistri = this.produciRegistri.bind(this);
    this.produciTest = this.produciTest.bind(this);
    this.produciDocumentazioneFinale = this.produciDocumentazioneFinale.bind(this);
  }

  componentDidMount() {

  }

  async produciRegistri(){

    await UserService.produciRegistriFnc().then(
        response => {
          this.setState({
            saveMessage: response.data
          });
        },
        error => {
          this.setState({
            saveMessage:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
    );

    await alert(this.state.saveMessage);

  }

  async produciTest(){
    await UserService.produciTestFnc().then(
        response => {
          this.setState({
            saveMessage: response.data
          });
        },
        error => {
          this.setState({
            saveMessage:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
    );

    await alert(this.state.saveMessage);
  }
  async produciDocumentazioneFinale(){
    await UserService.produciDocumentazioneFnc().then(
        response => {
          this.setState({
            saveMessage: response.data
          });
        },
        error => {
          this.setState({
            saveMessage:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
    );

    await alert(this.state.saveMessage);
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <label>FNC</label>
              </div>
              <div className="row">
                <button className="btn btn-sm btn-outline-success" type="button" onClick={this.produciRegistri}>Produci Registri</button>
              </div>
              <div className="row">
                <button className="btn btn-sm btn-outline-success" type="button" onClick={this.produciTest}>Produci Test</button>
              </div>
              <div className="row">
                <button className="btn btn-sm btn-outline-success" type="button" onClick={this.produciDocumentazioneFinale}>Produci Documentazione Finale</button>
              </div>
            </div>
          </div>
          <div className="card">
            <label>Formazione 4.0</label>
          </div>
        </header>
      </div>
    );
  }
}