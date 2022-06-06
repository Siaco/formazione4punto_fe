import React, {Component} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Modal from 'react-modal';
import InputFiles from 'react-input-files';
import Select from "react-select";

export default class BoardPresenze extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            modalIsOpen: false,
            annoSelezionato: 2019,
            dipendenteSelezionato: "",
            presenze: [],
            dipendenti: [],
            dipedentiOptions: [],
            columns: [{
                Header: "Codice Fiscale",
                accessor: "cf"
                    },{
                Header: "Data",
                accessor: "data"
            },{
                Header: "Ore",
                accessor: "ore"
            }]
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
        this.handleSaveClicked = this.handleSaveClicked.bind(this);
        this.downloadTemplatePresenze = this.downloadTemplatePresenze.bind(this);
        this.onChangeAnno = this.onChangeAnno.bind(this);
        this.openDettaglioPresenze = this.openDettaglioPresenze.bind(this);

        this.optionsAnno = [{value: '2019', label: '2019'}, {value: '2020', label: '2020'}, {value: '2021', label: '2021'}]
    }

    componentDidMount() {
        UserService.getPresenzeBoard().then(
            response => {
                this.setState({
                    presenze: response.data
                });
            },
            error => {
                this.setState({
                    presenze:
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

    handleSaveClicked = async (e) => {
        await UserService.importaPresenze(this.state.files[0]).then(
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
    downloadTemplatePresenze(){
        let anno = this.state.annoSelezionato;
        UserService.downloadTemplatePresenze(anno).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'presenze.xlsx'); //or any other extension
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

    onChangeAnno(newValue, actionMeta) {
        let annoS = newValue.value;

        this.setState({
            annoSelezionato: annoS
        });
    }

    openDettaglioPresenze(){
        alert('presenze')
    }

    render() {
        let dipendentiList = []
        if(this.state.dipendenti.length > 0) {
            dipendentiList = this.state.dipendenti.map((item, i) => ({value: item.id, label: item.cognome+" "+item.nome}));
        }
        
        return (
            <div className="container">
                <header className="jumbotron">
                    <button className="btn btn-sm btn-outline-success" type="button"
                            onClick={this.openModal}>Importa presenze
                    </button>
                    <Modal
                        className="Modal__Bootstrap modal-dialog"
                        closeTimeoutMS={150}
                        isOpen={this.state.modalIsOpen}
                        ariaHideApp={false}
                        onRequestClose={this.handleModalCloseRequest}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Importa Presenze </h4>
                                <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Select id = 'anno' options={this.optionsAnno} isSearchable={false} onChange={this.onChangeAnno} value={[{ value: this.state.annoSelezionato, label: this.state.annoSelezionato }]}/>
                                <button type="button" className="btn btn-secondary" onClick={this.downloadTemplatePresenze}> Scarica Template</button>
                                <p>Seleziona il file contenente i dati delle presenze dei dipendenti da caricare.</p>
                                <InputFiles  onChange={files => this.setState({files: files})} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                                    <button className="btn btn-secondary">seleziona file</button>
                                </InputFiles>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.handleModalCloseRequest}>Chiudi</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Importa presenze</button>
                            </div>
                        </div>
                    </Modal>
                    <br/>
                    <br/>
                    <br/>
                    <div className="card">
                    {this.state.presenze.length > 0
                        //? <Presenze data={this.state.presenze} mese={1} anno={2019}/>
                        ? <div className="row">
                            <div className="col">
                            <h4> Numero dipendenti: {this.state.dipendenti.length}</h4>
                            </div>
                            <div className="col">
                            <Select id = 'dipendente' options={dipendentiList} isSearchable={false} />
                            </div>
                            <div className="col">
                                <button className="btn btn-sm btn-outline-success" type="button"
                                        onClick={this.openDettaglioPresenze}>Apri presenze
                                </button>
                            </div>
                         </div>
                        : <p> Nessuna presenza inserita, importare le presenze.</p>
                    }
                    </div>
                </header>
            </div>
        );
    }
}