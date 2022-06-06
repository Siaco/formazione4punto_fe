import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Select from 'react-select'


export default class BoardAzienda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      aziende: "",
      sedi: [],
      saveMessage: ""
    };

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePIva = this.onChangePIva.bind(this);
    this.onChangeSedeLS = this.onChangeSedeLS.bind(this);
    this.onChangeSedeLP = this.onChangeSedeLP.bind(this);
    this.onChangeSedeLC = this.onChangeSedeLC.bind(this);
    this.onChangeSedeLCAP = this.onChangeSedeLCAP.bind(this);
    this.onChangeSedeLV = this.onChangeSedeLV.bind(this);
    this.onChangeSedeLCIV = this.onChangeSedeLCIV.bind(this);
    this.onChangePec = this.onChangePec.bind(this);
    this.onChangeAmministratoreUnicoNome = this.onChangeAmministratoreUnicoNome.bind(this);
    this.onChangeAmministratoreUnicoCognome = this.onChangeAmministratoreUnicoCognome.bind(this);
    this.onChangeAmministratoreUnicoLNascita = this.onChangeAmministratoreUnicoLNascita.bind(this);
    this.onChangeAmministratoreUnicoDNascita = this.onChangeAmministratoreUnicoDNascita.bind(this);
    this.onChangeFormaGiuridica = this.onChangeFormaGiuridica.bind(this);
    this.aggiungiSede = this.aggiungiSede.bind(this);
    this.rimuoviSede = this.rimuoviSede.bind(this);
    this.onChangeIndirizzoSede = this.onChangeIndirizzoSede.bind(this);
    this.onChangeNomeSede = this.onChangeNomeSede.bind(this);
    this.salvaAzienda = this.salvaAzienda.bind(this);
    this.onChangeDimensione = this.onChangeDimensione.bind(this);
    this.onChangeAteco = this.onChangeAteco.bind(this);

    this.sediDaRimuovere = []

    this.optionsDim = [{value: 'Micro', label: 'Micro'}, {value: 'Piccola', label: 'Piccola'}, {value: 'Media', label: 'Media'}, {value: 'Grande', label: 'Grande'}]

    this.options = [
      { value: 'IMPRENDITORE INDIVIDUALE AGRICOLO', label: 'IMPRENDITORE INDIVIDUALE AGRICOLO ' },
      { value: 'IMPRENDITORE INDIVIDUALE NON AGRICOLO', label: 'IMPRENDITORE INDIVIDUALE NON AGRICOLO ' },
      { value: 'LIBERO PROFESSIONISTA', label: 'LIBERO PROFESSIONISTA ' },
      { value: 'LAVORATORE AUTONOMO', label: 'LAVORATORE AUTONOMO ' },
      { value: 'SOCIETÀ SEMPLICE', label: 'SOCIETÀ SEMPLICE ' },
      { value: 'SOCIETÀ IN NOME COLLETTIVO', label: 'SOCIETÀ IN NOME COLLETTIVO ' },
      { value: 'SOCIETÀ IN ACCOMANDITA SEMPLICE', label: 'SOCIETÀ IN ACCOMANDITA SEMPLICE ' },
      { value: 'STUDIO ASSOCIATO E SOCIETÀ DI PROFESSIONISTI', label: 'STUDIO ASSOCIATO E SOCIETÀ DI PROFESSIONISTI ' },
      { value: 'SOCIETÀ DI FATTO O IRREGOLARE, COMUNIONE EREDITARIA', label: 'SOCIETÀ DI FATTO O IRREGOLARE, COMUNIONE EREDITARIA ' },
      { value: 'SOCIETÀ PER AZIONI', label: 'SOCIETÀ PER AZIONI ' },
      { value: 'SOCIETÀ A RESPONSABILITÀ LIMITATA', label: 'SOCIETÀ A RESPONSABILITÀ LIMITATA ' },
      { value: 'SOCIETÀ A RESPONSABILITÀ LIMITATA CON UN UNICO SOCIO', label: 'SOCIETÀ A RESPONSABILITÀ LIMITATA CON UN UNICO SOCIO ' },
      { value: 'SOCIETÀ IN ACCOMANDITA PER AZIONI', label: 'SOCIETÀ IN ACCOMANDITA PER AZIONI ' },
      { value: 'SOCIETÀ COOPERATIVA A MUTUALITÀ PREVALENTE', label: 'SOCIETÀ COOPERATIVA A MUTUALITÀ PREVALENTE ' },
      { value: 'SOCIETÀ COOPERATIVA DIVERSA', label: 'SOCIETÀ COOPERATIVA DIVERSA ' },
      { value: 'SOCIETÀ COOPERATIVA SOCIALE', label: 'SOCIETÀ COOPERATIVA SOCIALE ' },
      { value: 'SOCIETÀ DI MUTUA ASSICURAZIONE', label: 'SOCIETÀ DI MUTUA ASSICURAZIONE ' },
      { value: 'CONSORZIO DI DIRITTO PRIVATO', label: 'CONSORZIO DI DIRITTO PRIVATO ' },
      { value: 'SOCIETÀ CONSORTILE', label: 'SOCIETÀ CONSORTILE ' },
      { value: 'ASSOCIAZIONE O RAGGRUPPAMENTO TEMPORANEO DI IMPRES', label: 'ASSOCIAZIONE O RAGGRUPPAMENTO TEMPORANEO DI IMPRESE' },
      { value: 'GRUPPO EUROPEO DI INTERESSE ECONOMICO', label: 'GRUPPO EUROPEO DI INTERESSE ECONOMICO ' },
      { value: 'ENTE PUBBLICO ECONOMICO', label: 'ENTE PUBBLICO ECONOMICO ' },
      { value: 'AZIENDA SPECIALE AI SENSI DEL T.U. 267/200', label: 'AZIENDA SPECIALE AI SENSI DEL T.U. 267/2000' },
      { value: 'AZIENDA PUBBLICA DI SERVIZI ALLE PERSONE AI SENSI DEL D.LGS N. 207/2001', label: 'AZIENDA PUBBLICA DI SERVIZI ALLE PERSONE AI SENSI DEL D.LGS N. 207/2001 ' },
      { value: 'ASSOCIAZIONE RICONOSCIUTA', label: 'ASSOCIAZIONE RICONOSCIUTA ' },
      { value: 'FONDAZIONE (ESCLUSA FONDAZIONE BANCARIA)', label: 'FONDAZIONE (ESCLUSA FONDAZIONE BANCARIA) ' },
      { value: 'FONDAZIONE BANCARIA', label: 'FONDAZIONE BANCARIA ' },
      { value: 'ENTE ECCLESIASTICO', label: 'ENTE ECCLESIASTICO ' },
      { value: 'SOCIETÀ DI MUTUO SOCCORSO', label: 'SOCIETÀ DI MUTUO SOCCORSO ' },
      { value: 'ALTRA FORMA DI ENTE PRIVATO CON PERSONALITÀ GIURIDICA', label: 'ALTRA FORMA DI ENTE PRIVATO CON PERSONALITÀ GIURIDICA ' },
      { value: 'ASSOCIAZIONE NON RICONOSCIUTA', label: 'ASSOCIAZIONE NON RICONOSCIUTA ' },
      { value: 'COMITATO', label: 'COMITATO ' },
      { value: 'CONDOMINIO', label: 'CONDOMINIO ' },
      { value: 'ALTRA FORMA DI ENTE PRIVATO SENZA PERSONALITÀ GIURIDIC', label: 'ALTRA FORMA DI ENTE PRIVATO SENZA PERSONALITÀ GIURIDICA' },
      { value: 'IMPRESA O ENTE PRIVATO COSTITUITO ALL’ESTERO NON ALTRIMENTI CLASSIFICABILE CHE SVOLGE UNA ATTIVITÀ ECONOMICA IN ITALIA', label: 'IMPRESA O ENTE PRIVATO COSTITUITO ALL’ESTERO NON ALTRIMENTI CLASSIFICABILE CHE SVOLGE UNA ATTIVITÀ ECONOMICA IN ITALIA ' },
      { value: 'ORGANO COSTITUZIONALE O A RILEVANZA COSTITUZIONALE', label: 'ORGANO COSTITUZIONALE O A RILEVANZA COSTITUZIONALE ' },
      { value: 'PRESIDENZA DEL CONSIGLIO', label: 'PRESIDENZA DEL CONSIGLIO ' },
      { value: 'MINISTERO', label: 'MINISTERO ' },
      { value: 'AGENZIA DELLO STATO', label: 'AGENZIA DELLO STATO ' },
      { value: 'ARCHIVIO NOTARILE', label: 'ARCHIVIO NOTARILE ' },
      { value: 'AUTORITÀ INDIPENDENTI', label: 'AUTORITÀ INDIPENDENTI ' },
      { value: 'REGIONE', label: 'REGIONE ' },
      { value: 'PROVINCIA', label: 'PROVINCIA ' },
      { value: 'COMUNE', label: 'COMUNE ' },
      { value: 'COMUNITÀ MONTANA O ISOLANA', label: 'COMUNITÀ MONTANA O ISOLANA ' },
      { value: 'UNIONE DI COMUNI', label: 'UNIONE DI COMUNI ' },
      { value: 'CITTÀ METROPOLITANA', label: 'CITTÀ METROPOLITANA ' },
      { value: 'AZIENDA O ENTE DEL SERVIZIO SANITARIO NAZIONALE', label: 'AZIENDA O ENTE DEL SERVIZIO SANITARIO NAZIONALE ' },
      { value: 'ISTITUTO E SCUOLA PUBBLICA DI OGNI ORDINE E GRADO', label: 'ISTITUTO E SCUOLA PUBBLICA DI OGNI ORDINE E GRADO ' },
      { value: 'UNIVERSITÀ PUBBLICA', label: 'UNIVERSITÀ PUBBLICA ' },
      { value: 'ISTITUTO O ENTE PUBBLICO DI RICERCA', label: 'ISTITUTO O ENTE PUBBLICO DI RICERCA ' },
      { value: 'ISTITUTO PUBBLICO DI ASSISTENZA E BENEFICENZA', label: 'ISTITUTO PUBBLICO DI ASSISTENZA E BENEFICENZA ' },
      { value: 'CAMERA DI COMMERCIO', label: 'CAMERA DI COMMERCIO ' },
      { value: 'ORDINE E COLLEGIO PROFESSIONALE', label: 'ORDINE E COLLEGIO PROFESSIONALE ' },
      { value: 'CONSORZIO DI DIRITTO PUBBLICO', label: 'CONSORZIO DI DIRITTO PUBBLICO ' },
      { value: 'ENTE PARCO', label: 'ENTE PARCO ' },
      { value: 'ENTE O AUTORITÀ PORTUALE', label: 'ENTE O AUTORITÀ PORTUALE ' },
      { value: 'ENTE DI SVILUPPO AGRICOLO REGIONALE O DI ALTRO ENTE LOCALE', label: 'ENTE DI SVILUPPO AGRICOLO REGIONALE O DI ALTRO ENTE LOCALE ' },
      { value: 'ENTE PER IL TURISMO', label: 'ENTE PER IL TURISMO ' },
      { value: 'ENTE AMBIENTALE REGIONALE', label: 'ENTE AMBIENTALE REGIONALE ' },
      { value: 'ENTE PER LA RICERCA E PER L’AGGIORNAMENTO EDUCATIVO', label: 'ENTE PER LA RICERCA E PER L’AGGIORNAMENTO EDUCATIVO ' },
      { value: 'ALTRO ENTE PUBBLICO NON ECONOMICO NAZIONAL', label: 'ALTRO ENTE PUBBLICO NON ECONOMICO NAZIONALE' }
    ]
  }

  componentDidMount() {

    UserService.getAziendaBoard().then(
        response => {
          this.setState({
            aziende: response.data
          });
        },
        error => {
          this.setState({
            aziende:
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
    UserService.getSedi().then(
        response => {
          this.setState({
            sedi: response.data
          });
        },
        error => {
          this.setState({
            sedi:
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

  annullaModifiche(){

  }

  aggiungiSede(){
    let sediM = this.state.sedi;

    sediM = [...sediM, {id: -1, nome:"", indirizzoSede:""}]

    this.setState({
      sedi: sediM
    });
  }

  rimuoviSede(){

    let sediN = this.state.sedi;

    this.sediDaRimuovere.forEach(toR => sediN.splice(toR, 1));

    this.sediDaRimuovere = []

    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );

    this.setState({
      sedi: sediN
    });

    this.salvaAzienda();
  }

  onChangeNome(e) {
    let contentM = this.state.aziende;

    contentM['nome'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangePec(e) {
    let contentM = this.state.aziende;

    contentM['indirizzoPec'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLS(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleStato'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLP(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleProvincia'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLC(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleCitta'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLCAP(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleCap'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLV(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleVia'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeSedeLCIV(e) {
    let contentM = this.state.aziende;

    contentM['sedeLegaleCivico'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangePIva(e) {
    let contentM = this.state.aziende;

    contentM['partitaIva'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeAmministratoreUnicoNome(e) {
    let contentM = this.state.aziende;

    contentM['amministratoreUnicoNome'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeAmministratoreUnicoCognome(e) {
    let contentM = this.state.aziende;

    contentM['amministratoreUnicoCognome'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeAmministratoreUnicoLNascita(e) {
    let contentM = this.state.aziende;

    contentM['amministratoreUnicoLNascita'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeAmministratoreUnicoDNascita(e) {
    let contentM = this.state.aziende;

    contentM['amministratoreUnicoDNascita'] = e.target.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeFormaGiuridica(newValue, actionMeta) {
    let contentM = this.state.aziende;

    contentM['formaGiuridica'] = newValue.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeDimensione(newValue, actionMeta) {
    let contentM = this.state.aziende;

    contentM['dimensione'] = newValue.value;

    this.setState({
      aziende: contentM
    });
  }

  onChangeNomeSede(index, e){
    let sediM = this.state.sedi;

    sediM[index].nome = e.target.value;

    this.setState({
      sedi: sediM
    });

  }

  onChangeIndirizzoSede(index, e){
    let sediM = this.state.sedi;

    sediM[index].indirizzoSede = e.target.value;

    this.setState({
      sedi: sediM
    });
  }

  onChangeAteco(e){
    let contentM = this.state.aziende;
    if(e.target.value.length === 8){
      UserService.getDenominazioneAteco(e.target.value).then(
          response => {
              contentM['descrizioneAteco']= response.data.hits.hits[0]._source.sottocategoria.titolo
              this.setState({descrizioneAteco: response.data.hits.hits[0]._source.sottocategoria.titolo});
          },
          error => {
            contentM['descrizioneAteco'] = ''
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }
      );


    }
    contentM['codiceAteco'] = e.target.value;
    this.setState({
      aziende: contentM
    });
  }

  onChangeSelection(index, e){
    if(e.target.checked){
      this.sediDaRimuovere.push(index);
    } else {
      let id = this.sediDaRimuovere.indexOf(index);
      if(id !== -1)
        this.sediDaRimuovere.splice(index, 1)
    }
  }

  async salvaAzienda(){
    await UserService.salvaAzienda(this.state.aziende).then(
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

    await UserService.salvaSedi(this.state.sedi).then(
        response => {
          this.setState({
            saveMessageSedi: response.data
          });
        },
        error => {
          this.setState({
            saveMessageSedi:
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
            <h2> Azienda {this.state.aziende.nome || ""}</h2>
            <div className="card">
              <div className="card-body">

                <div className="row">
                  <div className="col-md-9"></div>
                  <div className="col-md-3">
                    <button className="btn btn-sm btn-outline-success" disabled={this.state.isAdminAzienda} type="button" onClick={this.salvaAzienda}>Salva</button>
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={this.annullaModifiche}>Annulla
                      modifiche
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col"><label>Nome Azienda</label>
                    <input value={this.state.aziende.nome || ""} type="text" className="form-control"  onChange={this.onChangeNome}/>
                  </div>
                  <div className="col"><label>Partita Iva</label>
                    <input value={this.state.aziende.partitaIva|| ""} type="text" className="form-control" onChange={this.onChangePIva}/>
                  </div>
                  <div className="col"><label>Dimensioni Impresa</label>
                    <Select id = 'dim' options={this.optionsDim} isSearchable={true} onChange={this.onChangeDimensione} value={[{ value: this.state.aziende.dimensione, label: this.state.aziende.dimensione }]}/>
                  </div>
                  <div className="col"><label>Indirizzo PEC</label>
                    <input value={this.state.aziende.indirizzoPec|| ""} type="text" className="form-control" onChange={this.onChangePec}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col"><label>Forma Giuridica</label>
                    <Select id = 'fg' options={this.options} isSearchable={true} onChange={this.onChangeFormaGiuridica} value={[{ value: this.state.aziende.formaGiuridica, label: this.state.aziende.formaGiuridica }]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col"><label>Codice Ateco</label>
                    <input value={this.state.aziende.codiceAteco|| ""} type="text" className="form-control" onChange={this.onChangeAteco}/>
                  </div>
                  <div className="col"><label>Descrizione Ateco</label>
                    <input value={this.state.descrizioneAteco|| ""} type="text" className="form-control" disabled={true}/>
                  </div>
                </div>
                <div className="card">
                  <label>Sede Legale: </label>
                  <div className="row">
                    <div className="col"><label>Stato</label>
                      <input value={this.state.aziende.sedeLegaleStato|| ""} type="text" className="form-control" onChange={this.onChangeSedeLS}/>
                    </div>
                    <div className="col"><label>Provincia</label>
                      <input value={this.state.aziende.sedeLegaleProvincia|| ""} type="text" className="form-control" onChange={this.onChangeSedeLP}/>
                    </div>
                    <div className="col"><label>Città</label>
                      <input value={this.state.aziende.sedeLegaleCitta|| ""} type="text" className="form-control" onChange={this.onChangeSedeLC}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col"><label>Cap</label>
                      <input value={this.state.aziende.sedeLegaleCap|| ""} type="text" className="form-control" onChange={this.onChangeSedeLCAP}/>
                    </div>
                    <div className="col"><label>Via</label>
                      <input value={this.state.aziende.sedeLegaleVia|| ""} type="text" className="form-control" onChange={this.onChangeSedeLV}/>
                    </div>
                    <div className="col"><label>Civico</label>
                      <input value={this.state.aziende.sedeLegaleCivico|| ""} type="text" className="form-control" onChange={this.onChangeSedeLCIV}/>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <label>Amministratore Unico: </label>
                  <div className="row">
                    <div className="col"><label>Nome</label>
                      <input value={this.state.aziende.amministratoreUnicoNome || ""} type="text" className="form-control" onChange={this.onChangeAmministratoreUnicoNome}/>
                    </div>
                    <div className="col"><label>Cognome</label>
                      <input value={this.state.aziende.amministratoreUnicoCognome || ""} type="text" className="form-control" onChange={this.onChangeAmministratoreUnicoCognome}/>
                    </div>
                    <div className="col"><label>Nat* a</label>
                      <input value={this.state.aziende.amministratoreUnicoLNascita || ""} type="text" className="form-control" onChange={this.onChangeAmministratoreUnicoLNascita}/>
                    </div>
                    <div className="col"><label>il</label>
                      <input value={this.state.aziende.amministratoreUnicoDNascita || ""} type="text" className="form-control" onChange={this.onChangeAmministratoreUnicoDNascita}/>
                    </div>
                  </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                  <div className="col">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8"></div>
                          <div className="col-md-4">
                            <button className="btn btn-sm btn-outline-success" type="button"
                                    onClick={this.aggiungiSede}>Aggiungi Sede
                            </button>
                            <button className="btn btn-sm btn-outline-danger" type="button" onClick={this.rimuoviSede}>Rimuovi
                              Sede
                            </button>
                          </div>
                        </div>
                        {this.state.sedi && this.state.sedi.map((sede, index) => (
                            <div className="row" key={index}>
                              <div className="col-1 align-self-center"><p></p>
                                <input type="checkbox" value={sede.id} onChange={this.onChangeSelection.bind(this, index)}/>
                              </div>
                              <div className="col"><label>Nome Sede</label>
                                <input value={sede.nome} type="text" className="form-control" onChange={this.onChangeNomeSede.bind(this, index)}/>
                              </div>
                              <div className="col"><label>Indirizzo Sede</label>
                                <input value={sede.indirizzoSede} type="text" className="form-control" onChange={this.onChangeIndirizzoSede.bind(this, index)}/>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
    );
  }
}
