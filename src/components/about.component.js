import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="content">
            <h1>Credito di imposta formazione 4.0</h1>
            <br/>
              <h3>Generalità e descrizione della norma</h3>
              <br/>
                <p>
                  La norma oggetto di presentazione si sostanzia in un bonus riconosciuto alle aziende sotto
                  forma di Credito d&#39;Imposta a fronte delle attività di formazione di tipo tecnologico/informatico.
                </p>
                <br/>
                  <h3>Chi può usufruire del diritto?</h3>
                  <br/>
                    <p>
                      - Riguarda tutti i tipi di aziende (srl, srls, snc, sas, cooperative, consorzi, spa, ecc.) e tutti
                      i
                      settori di attività (edilizio, turistico, alimentare, ristorazione, trasporti, servizi, commercio,
                      studi professionali, sanità privata, pulizie, ecc. ..tutti fatta eccezione per le aziende
                      pubbliche).
                      <br/>
                        <br/>
                          - E&#39; applicabile a tutte le tipologie di dipendenti: full-time, part-time, a tempo
                          determinato,
                          indeterminato, stagionali, ecc. purché a assunti a norma dell’art 2094 del codice civile
                          (segnatamente il personale dipendente, escludendo quindi i lavoratori contrattualizzati
                          con qualsiasi forma di collaborazione a varia titolo prevista dal codice civile).
                    </p>
                    <br/>
                      <h3>Come si quantifica il bonus?</h3>
                      <br/>
                        <p>
                          - Il Credito NON si calcola sul costo del formatore esterno, BENSI&#39; sul costo del
                          personale inserito nel progetto della formazione.
                          <br/>
                            <br/>
                              - E’ il risultato che si ottiene moltiplicando le ore di formazione a cui i lavoratori si
                              sono
                              dedicati, per il costo orario degli stessi.
                              <br/>
                                <br/>
                                  - Il credito d&#39;imposta massimo maturabile in annuo è pari ad € 300.000,00 annui
                                  <br/>
                                    <br/>
                                      - Il credito d&#39;imposta che generalmente si matura per un singolo dipendente
                                      assunto full time è
                                      pari a circa Euro 3.000/3.500 all&#39;anno.
                                      <br/>
                                        <br/>
                                          - A mero titolo esemplificativo e non esaustivo, un&#39;azienda con 20
                                          dipendenti maturerà
                                          un credito d&#39;imposta pari ad un importo compreso tra Euro 60.000 ed Euro
                                          70.000, fino
                                          a un tetto massimo di Euro 300.000 (che si raggiunge in genere con circa 100
                                          dipendenti).
                        </p>
                        <br/>
                          <h3>Come usufruire del diritto?</h3>
                          <br/>
                            <p>
                              Una volta completata la pratica, il software elabora tutta la documentazione necessaria ad
                              attenere la certificazione asseverata da un Revisore Legale dei Conti iscritto
                              nell’apposito registro tenuto
                              dal Ministero di Grazie e Giustizia.
                              L’importo determinato del Credito d&#39;Imposta asseverato può essere utilizzato subito in
                              compensazione
                              con tutti i tipi di imposte dovute (tecnicamente è definita compensazione verticale): a
                              titolo
                              esemplificativo e non esaustivo (contributi Inps, Inail, Irpef e Iva).
                            </p>
                            <br/>
                              <h3>L'asseverazione del certificatore è un costo per l'azienda?</h3>
                              <br/>
                                <p>
                                  Il Credito asseverato dal Revisore, è oggetto di parcella pari ad Euro 5.000 oltre iva
                                  per
                                  l&#39;asseverazione; NON RISULTA PERO’ ESSERE UN COSTO PER L’AZIENDA
                                  POICHE’ VA AD AUMENTARE L’IMPORTO DEL CREDITO FRUIBILE
                                  DALL’AZIENDA ESATTAMENTE PER LO STESSO AMMONTARE.
                                </p>
                                <br/>
                                  <h3>Documenti necessari ai fini dell'elaborazione dei documenti mediante
                                    piattaforma</h3>
                                  <br/>
                                    <p>
                                      Al fine di poter rendere operativo il software e produrre la documentazione
                                      necessaria
                                      all’ottenimento dell’asseverazione, si rende necessario fornire, da parte
                                      dell’azienda:
                                      <br/>
                                        <br/>
                                          - BUSTE PAGA dei dipendenti (LUL completi di registro presenze);
                                          <br/>
                                            <br/>
                                              - COSTO DEL LAVORO (costo orario lordo onnicomprensivo).
                                    </p>
                                    <br/>
                                      <h3>Sviluppo operativo della pratica mediante piattaforma</h3>
                                      <br/>
                                        <p>
                                          Ottenuta la documentazione richiesta, il software operativo permette
                                          all’azienda di
                                          consulenza (o azienda utilizzatrice) di concludere l’intera pratica ottenendo:
                                          <br/>
                                            <br/>
                                              1) REGISTRO PRESENZE RELATIVO ALLE ATTIVITA’ DI
                                              FORMAZIONE (ore di formazione giorno per giorno, per ciascun dipendente);
                                              <br/>
                                                <br/>
                                                  2) RELAZIONE FINALE DEL DOCENTE (completa di valutazione
                                                  dell’andamento
                                                  dei corsi);
                                                  <br/>
                                                    <br/>
                                                      3) ATTESTAZIONE DELLA FREQUENZA CORSO (prodotta per ogni singolo
                                                      dipendente che può iscritta dallo stesso nel personale cv).
                                        </p>
                                        <br/>
                                          <br/>
                                            <br/>
                                              <h5>
                                                Riferimenti normativi
                                              </h5>
            <span>
              Legge sul Credito d&#39;Imposta per la Formazione 4.0 (Legge di Bilancio 2018, art.1 c.46-56; Legge di Bilancio 2019, art.1, c.78-81; Legge di Bilancio 2020, art. 1 commi 210 -217). Riferimento web: <a href="https://www.mise.gov.it/index.php/it/incentivi/impresa/credito-d-imposta-formazione">MiSE</a>
            </span>
          </div>
        </header>
      </div>
    );
  }
}
