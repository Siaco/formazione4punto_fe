import React, {Component, forwardRef} from "react";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {Alert} from "react-bootstrap";
import MaterialTable from "material-table";




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


export default class BoardCorsi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            corsi: [],
            iserror: false,
            setIserror: false,
            errorMessages: [],
            setErrorMessages: [],
            columns: [ {title: "id", field: "id", hidden:true},
                {title: "Corso", field: "nomeCorso", hidden:false},
                {title: "Livello", field: "livello", hidden:false},
                {title: "Numero Lezioni", field: "numeroLezioni", hidden:false},
                {title: "Durata Lezione", field: "durataLezione", hidden:false},
                {title: "#Partecipanti minimo", field: "numeroPartecipantiMinimo", hidden:false},
                {title: "#Partecipanti massimo", field: "numeroPartecipantiMassimo", hidden:false} ]}

        this.handleRowUpdate = this.handleRowUpdate.bind(this);
        this.handleRowAdd = this.handleRowAdd.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);

    }

    componentDidMount() {
        UserService.getCorsiBoard().then(
            response => {
                this.setState({
                    corsi: response.data
                });
            },
            error => {
                this.setState({
                    corsi:
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

    handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.nome === ""){
            errorList.push("Prego inserire nome")
        }

        if(errorList.length < 1){
            UserService.aggiungiCorso(newData).then(
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

        if(errorList.length < 1){ //no error
            UserService.aggiungiCorso(newData).then(
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

    handleRowDelete = (oldData, resolve) => {

        UserService.deleteCorso(oldData.id).then(
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

    render() {
        return (
            <div className="container">
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
                    title="Corsi"
                    columns={this.state.columns}
                    data={this.state.corsi}
                    icons={tableIcons}
                    editable={{
                        onRowAddCancelled: rowData => console.log('Aggiunta corso annullata.'),
                        onRowUpdateCancelled: rowData => console.log('Modifica corso annullata.'),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                this.handleRowAdd(newData, resolve);
                            }),
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
                            nRowsSelected: '{0} corso(i) selezionati',
                            searchTooltip: 'Cerca',
                            searchPlaceholder: 'Cerca'
                        },
                        header: {
                            actions: 'Azioni'
                        },
                        body: {
                            emptyDataSourceMessage: 'Nessun corso trovato',
                            addTooltip: 'aggiungi corso',
                            deleteTooltip: 'elimina corso',
                            editTooltip: 'modifica corso',
                            filterRow: {
                                filterTooltip: 'Filtro'
                            },
                            editRow:{
                                deleteText: 'Sei sicuro di voler eliminare questo corso?',
                                cancelTooltip: 'Annulla',
                                saveTooltip: 'Salva'
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
