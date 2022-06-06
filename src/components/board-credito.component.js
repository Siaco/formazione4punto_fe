import React, {Component} from "react";

import UserService from "../services/user.service";
import Select from "react-select";
import EventBus from "../common/EventBus";


export default class BoardAdmin extends Component {
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
            percentuale: 40,
            annoSelezionato: 2018,
            creditoCalcolato: 0
        };

        this.loadOptionsAziende = this.loadOptionsAziende.bind(this);
        this.onChangeAzienda = this.onChangeAzienda.bind(this);
        this.onChangeAnno = this.onChangeAnno.bind(this);
        this.loadCalcoloCreditoImposta = this.loadCalcoloCreditoImposta.bind(this);
        this.onChangePercentuale = this.onChangePercentuale.bind(this);
        this.salvaPercentuale = this.salvaPercentuale.bind(this);

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

    onChangePercentuale(e) {
        this.setState({
            percentuale: e.target.value
        });
    }

    salvaPercentuale(){
        let idAzienda = this.state.idAziendaSelezionata;
        let perc = this.state.percentuale;
        let anno = this.state.annoSelezionato;

        UserService.salvaPercentuale(idAzienda, perc, anno).then(
            response => {
                alert(response.data)
            },
            error => {
                alert(error)

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    loadCalcoloCreditoImposta(){
        let idAzienda = this.state.idAziendaSelezionata;
        let perc = this.state.percentuale;
        let anno = this.state.annoSelezionato;

        UserService.calcolaCreditoImposta(idAzienda, perc, anno).then(
            response => {
                this.setState({
                    creditoCalcolato: response.data
                });
            },
            error => {
                this.setState({
                    creditoCalcolato:
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
                                    <div className="col">
                                        <label>Percentuale detrazione:</label>
                                        <input value={this.state.percentuale|| ""} type="text" className="form-control" onChange={this.onChangePercentuale}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-secondary" onClick={this.loadCalcoloCreditoImposta}>Calcola credito</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <br/>
                        {this.state.showCreditoPanel && (
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <label>L'azienda {this.state.nomeAziendaSelezionata} per l'anno {this.state.annoSelezionato} dispone del seguente credito d'imposta: </label>
                                        {this.state.creditoCalcolato} €
                                    </div>
                                    <div>
                                        <div className="col">
                                            <button type="button" className="btn btn-secondary" onClick={this.salvaPercentuale}>Salva percentuale</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>);
    }
}