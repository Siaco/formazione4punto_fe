import React, {Component} from "react";

import UserService from "../services/user.service";
import Select from "react-select";
import EventBus from "../common/EventBus";


export default class BoardCalendari extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            idAziendaSelezionata: "",
            nomeAziendaSelezionata: "",
            azienda: null,
            aziendeAssociate: [],
            optionsAziende: [],
            showSelectAziende: false,
            showCreditoPanel: false,
            percentuale: '',
            annoSelezionato: 2018,
            creditoCalcolato: 0
        };

        this.loadOptionsAziende = this.loadOptionsAziende.bind(this);
        this.onChangeAzienda = this.onChangeAzienda.bind(this);
        this.onChangeAnno = this.onChangeAnno.bind(this);
        this.loadCaricaCreditoImposta = this.loadCaricaCreditoImposta.bind(this);
        this.richiediCalendari = this.richiediCalendari.bind(this);

        this.optionsAnno = [{value: '2018', label: '2018'}, {value: '2019', label: '2019'}, {value: '2020', label: '2020'}, {value: '2021', label: '2021'}]
    }

    componentDidMount(){
        UserService.getAziendeAssociate().then(
            response => {
                this.setState({
                    aziendeAssociate: response.data
                });
            },
            error => {
                this.setState({
                    aziendeAssociate:
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

    loadOptionsAziende(){
        this.setState({
            optionsAziende: this.state.aziendeAssociate.map((azienda) => ({value: azienda.id, label: azienda.nome})),
        });
        this.setState({
            showSelectAziende: true
        });
    }

    onChangeAzienda(newValue, actionMeta) {
        this.setState({
            idAziendaSelezionata: newValue.value
        });

        this.setState({
            nomeAziendaSelezionata: newValue.label
        });
    }

    onChangeAnno(newValue, actionMeta) {
        let annoS = newValue.value;

        this.setState({
            annoSelezionato: annoS
        });
    }

    loadCaricaCreditoImposta(){
        let idAzienda = this.state.idAziendaSelezionata;
        let anno = this.state.annoSelezionato;

        UserService.caricaCreditoImposta(idAzienda, anno).then(
            response => {
                this.setState({
                    percentuale: response.data
                });
            },
            error => {
                this.setState({
                    percentuale:
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



        this.setState({
            showCreditoPanel: true
        });
    }

    richiediCalendari(){
        let idAzienda = this.state.idAziendaSelezionata;
        let anno = this.state.annoSelezionato;

        UserService.richiediCalendari(idAzienda, anno).then(
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
    }

    render() {
        return (<div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-secondary" onClick={this.loadOptionsAziende}>Carica Aziende</button>
                    </div>
                </div>
                {this.state.showSelectAziende && (
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <label>Seleziona azienda:</label>
                                <Select id = 'aziende' options={this.state.optionsAziende} isSearchable={false} onChange={this.onChangeAzienda} value={[{ value: this.state.idAziendaSelezionata, label: this.state.nomeAziendaSelezionata }]}/>
                            </div>
                            <div className="col">
                                <label>Seleziona anno:</label>
                                <Select id = 'anno' options={this.optionsAnno} isSearchable={false} onChange={this.onChangeAnno} value={[{ value: this.state.annoSelezionato, label: this.state.annoSelezionato }]}/>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={this.loadCaricaCreditoImposta}>Carica credito</button>
                            </div>
                        </div>
                    </div>
                )}
                <br/>
                {this.state.showCreditoPanel && (
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <label>L'azienda {this.state.nomeAziendaSelezionata} per l'anno {this.state.annoSelezionato}: </label>
                                {this.state.percentuale} %
                            </div>
                            <div>
                                <div className="col">
                                    <button type="button" className="btn btn-secondary" onClick={this.richiediCalendari}>Richiedi Calendari</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>);
    }
}