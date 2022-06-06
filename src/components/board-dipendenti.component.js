import React, {Component, forwardRef} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Modal from 'react-modal';
import InputFiles from 'react-input-files';

import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Alert} from "react-bootstrap";

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class BoardDipendenti extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      modalIsOpen: false,
      modalIsOpenDip: false,
      dipendenti: [],
      files: [],
      sedi: [],
      iserror: false,
      setIserror: false,
      errorMessages: [],
      setErrorMessages: [],
      columns: [ {title: "id", field: "id", hidden:true},
          {title: "Cognome", field: "cognome", hidden:false},
          {title: "Nome", field: "nome", hidden:false},
          {title: "Codice Fiscale", field: "cf", hidden:false},
          {title: "Sede", field: "id_sede", render: rowData => this.getNomeSede(rowData), hidden:false},
          {title: "Docente", field: "docente", hidden:false},
          {title: "Discente", field: "discente", hidden:false},
          {title: "Costo Orario", field: "costoOrario", hidden:false},
          {title: "Disagiato", field: "disagiato", hidden:false},
          {title: "Livello Corsi", field: "livelloCorsi", hidden:false}, ]
    };

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
      this.handleSaveClicked = this.handleSaveClicked.bind(this);
      this.openModalDip = this.openModalDip.bind(this);
      this.closeModalDip = this.closeModalDip.bind(this);
      this.handleModalCloseRequestDip = this.handleModalCloseRequestDip.bind(this);
      this.downloadTemplate = this.downloadTemplate.bind(this);
      this.handleRowUpdate = this.handleRowUpdate.bind(this);
      this.handleRowAdd = this.handleRowAdd.bind(this);
      this.handleRowDelete = this.handleRowDelete.bind(this);
  }

  getNomeSede(row){
      let sede = this.state.sedi.find((element) => {
          return element.id === row.id_sede;
      });
      return sede.nome;
  }
    handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.nome === ""){
            errorList.push("Prego inserire nome")
        }
        if(newData.cognome === ""){
            errorList.push("Prego inserire cognome")
        }

        if(errorList.length < 1){
            UserService.aggiungiDipendente(newData).then(
                response => {
                    alert(response.data);
                },
                error => {
                    alert(error);
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
            window.location.reload();
            resolve()
            this.state.setIserror(false)
            this.state.setErrorMessages([])
        }else{
            this.state.setErrorMessages(errorList)
            this.state.setIserror(true)
            resolve()
        }

    }

    handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.nome === ""){
            errorList.push("Prego inserire nome")
        }
        if(newData.cognome === ""){
            errorList.push("Prego inserire cognome")
        }

        if(errorList.length < 1){ //no error
            UserService.aggiungiDipendente(newData).then(
                response => {
                    alert(response.data);
                },
                error => {
                    alert(error);
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
            resolve()
            this.state.setIserror(false)
            this.state.setErrorMessages([])
        }else{
            this.state.setErrorMessages(errorList)
            this.state.setIserror(true)
            resolve()
        }


    }

    handleRowDelete = (oldData, resolve) => {

        UserService.deleteDipendente(oldData.id).then(
            response => {
              alert(response.data);
            },
            error => {
                alert(error);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
        window.location.reload();
        resolve()
        this.state.setIserror(false)
        this.state.setErrorMessages([])
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
            </div>
            <br/>
            <br/>
            <br/>
            <div>
                {this.state.iserror &&
                <Alert severity="error">
                    {this.state.errorMessages.map((msg, i) => {
                        return <div key={i}>{msg}</div>
                    })}
                </Alert>
                }
            </div>
            <MaterialTable
                title="Dipendenti"
                columns={this.state.columns}
                data={this.state.dipendenti}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            this.handleRowUpdate(newData, oldData, resolve);

                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            this.handleRowDelete(oldData, resolve)
                        }),
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} di {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} dipendente(i) selezionati',
                        searchTooltip: 'Cerca',
                        searchPlaceholder: 'Cerca'
                    },
                    header: {
                        actions: 'Azioni'
                    },
                    body: {
                        emptyDataSourceMessage: 'Nessun dipendente trovato',
                        addTooltip: 'aggiungi dipendente',
                        deleteTooltip: 'elimina dipendente',
                        editTooltip: 'modifica dipendente',
                        filterRow: {
                            filterTooltip: 'Filtro'
                        },
                        editRow:{
                            deleteText: 'Sei sicuro di voler eliminare questo dipendente?',
                            cancelTooltip: 'Annulla',
                            saveTooltip: 'Salva'
                        }
                    }
                }}
            />
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

        </header>
      </div>
    );
  }
}
