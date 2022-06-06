import React, {Component} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Table from "../common/presenze";
import Modal from 'react-modal';
import InputFiles from 'react-input-files';

export default class BoardDipendenti extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: "",
      modalIsOpen: false,
      modalIsOpenDip: false,
      dipendenti: [],
      files: [],
      columns: [{
                    Header: "Cognome",
                    accessor: "cognome"
                },{
                    Header: "Nome",
                    accessor: "nome"
                },{
                    Header: "Codice Fiscale",
                    accessor: "cf"
                },{
                    Header: "Docente",
                    accessor: "docente"
                },{
                    Header: "Discente",
                    accessor: "discente"
                },{
                    Header: "Costo Orario",
                    accessor: "costoOrario"
              },{
                    Header: "Disagiato",
                    accessor: "disagiato"
                  },{
                    Header: "Livello Corsi",
                    accessor: "livelloCorsi"
                  }]
    };

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
      this.handleSaveClicked = this.handleSaveClicked.bind(this);
      this.openModalDip = this.openModalDip.bind(this);
      this.closeModalDip = this.closeModalDip.bind(this);
      this.handleModalCloseRequestDip = this.handleModalCloseRequestDip.bind(this);
      this.handleSaveClickedDip = this.handleSaveClickedDip.bind(this);
      this.downloadTemplate = this.downloadTemplate.bind(this);
  }



  componentDidMount() {
    UserService.getDipendentiBoard().then(
        response => {
          this.setState({
            dipendenti: response.data
          });
        },
        error => {
          this.setState({
            dipendenti:
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

  }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
    }

    openModalDip = () => {
        this.setState({modalIsOpenDip: true});
    }

    closeModalDip = () => {
        this.setState({modalIsOpenDip: false});
    }

    handleModalCloseRequestDip = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpenDip: false});
    }

    handleSaveClicked = async (e) => {
        await UserService.importaDipendenti(this.state.files[0]).then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
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
        await alert(this.state.content);
        window.location.reload();
  }

    handleSaveClickedDip = async (e) => {

        alert(document.getElementById('cognomeDipendente').value);
        window.location.reload();
    }
    downloadTemplate(){
        UserService.downloadTemplateDipendenti().then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'dipendenti.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            },
            error => {
                this.setState({
                    content:
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
    }

  render() {


    return (
      <div className="container">
        <header className="jumbotron">
            <div className="row">
                <div className="col-md-9">
                    <button className="btn btn-sm btn-outline-success" type="button"
                            onClick={this.openModal}>Importa dipendenti
                    </button>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-sm btn-outline-success" type="button"
                            onClick={this.openModalDip}>Aggiungi dipendente
                    </button>
                </div>
            </div>
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modalIsOpen}
                ariaHideApp={false}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Importa Dipendenti <button type="button" className="btn btn-secondary" onClick={this.downloadTemplate}> Scarica Template</button></h4>
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Seleziona il file contenente i dati dei dipendenti da caricare.</p>
                        <InputFiles  onChange={files => this.setState({files: files})} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                            <button className="btn btn-secondary">seleziona file</button>
                        </InputFiles>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.handleModalCloseRequest}>Chiudi</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Importa dipendenti</button>
                    </div>
                </div>
            </Modal>
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modalIsOpenDip}
                ariaHideApp={false}
                onRequestClose={this.handleModalCloseRequestDip}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Aggiungi Dipendente</h4>
                        <button type="button" className="close" onClick={this.handleModalCloseRequestDip}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="row">
                                <div className="col">
                                    <label>Cognome: </label>
                                    <input type="text" name="cognomeDipendente" id="cognomeDipendente"/>
                                    <label>Nome: </label>
                                    <input type="text" name="nomeDipendente" id="nomeDipendente"/>
                                    <label>Codice Fiscale: </label>
                                    <input type="text" name="codiceFiscaleDipendente" id="codiceFiscaleDipendente"/>
                                </div>
                            </div>
                            <div className="row">

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.handleModalCloseRequestDip}>Chiudi</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClickedDip}>Salva dipendente</button>
                    </div>
                </div>
            </Modal>
            <Table columns={this.state.columns} data={this.state.dipendenti} />
        </header>
      </div>
    );
  }
}
