import React, {Component, forwardRef} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Check from "@material-ui/icons/Check";
import MaterialTable from "material-table";
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
import Autorenew from  "@material-ui/icons/Autorenew";
import ListAlt from "@material-ui/icons/ListAlt";

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

export default class BoardGestioneCalendari extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            listJobCalendari: [],
            columns: [ {title: "id", field: "id", hidden:true},
                        {title: "ID Azienda", field: "idAzienda", hidden:false},
                        {title: "Anno", field: "anno", hidden:false},
                        {title: "Stato", field: "stato", hidden:false}]
        };

        this.downloadRegistro = this.downloadRegistro.bind(this);
        this.downloadRelazione = this.downloadRelazione.bind(this);
        this.downloadAttestati = this.downloadAttestati.bind(this);

    }

    componentDidMount(){
        UserService.getCalendari().then(
            response => {
                this.setState({
                    listJobCalendari: response.data
                });
            },
            error => {
                this.setState({
                    listJobCalendari:
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

    generaCalendari(aziendeSelezionate){

        UserService.generaCalendari(aziendeSelezionate).then(
            response => {
                alert(response.data);
            },
            error => {
                alert(error.response);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );

        window.location.reload();
    }

    generaRegistri(aziendeSelezionate){
        console.log(aziendeSelezionate)
        UserService.generaRegistri(aziendeSelezionate).then(
            response => {
                alert(response.data);
                console.log(response.data);
            },
            error => {
                alert(error.response);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );

        //window.location.reload();
    }

    downloadRegistro(job){
        UserService.downloadRegistro(job).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'registro.pdf'); //or any other extension
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

    downloadRelazione(job){
        UserService.downloadRelazione(job).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'relazione.pdf'); //or any other extension
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
    downloadProspetto(job){
        UserService.downloadProspetto(job).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'prospetto.xlsx'); //or any other extension
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
    downloadAttestati(job){
        UserService.downloadAttestati(job).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'attestati.xlsx'); //or any other extension
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

        return (<div className="card">
                    <div className="card-body">
                        <MaterialTable
                            title="Aziende"
                            columns={this.state.columns}
                            data={this.state.listJobCalendari}
                            icons={tableIcons}
                            options={{
                                selection: true
                            }}
                            actions={[
                                {
                                    tooltip: 'Genera calendari',
                                    icon: Check,
                                    onClick: (evt, data) => this.generaCalendari(data)
                                },
                                {
                                    tooltip: 'Genera registri',
                                    icon: Autorenew,
                                    onClick: (evt, data) => this.generaRegistri(data)
                                },
                                {
                                    tooltip: 'Scarica registri',
                                    icon: SaveAlt,
                                    onClick: (evt, data) => this.downloadRegistro(data[0].id)
                                },
                                {
                                    tooltip: 'Scarica relazione',
                                    icon: SaveAlt,
                                    onClick: (evt, data) => this.downloadRelazione(data[0].id)
                                },
                                {
                                    tooltip: 'Scarica attestati',
                                    icon: SaveAlt,
                                    onClick: (evt, data) => this.downloadAttestati(data[0].id)
                                },
                                {
                                    tooltip: 'Scarica prospetto',
                                    icon: ListAlt,
                                    onClick: (evt, data) => this.downloadProspetto(data[0].id)
                                }
                            ]}
                            localization={{
                                pagination: {
                                    labelDisplayedRows: '{from}-{to} di {count}'
                                },
                                toolbar: {
                                    nRowsSelected: '{0} aziende(i) selezionati',
                                    searchTooltip: 'Cerca',
                                    searchPlaceholder: 'Cerca'
                                },
                                header: {
                                    actions: 'Azioni'
                                },
                                body: {
                                    emptyDataSourceMessage: 'Nessuna azienda trovato',
                                    addTooltip: 'aggiungi azienda',
                                    deleteTooltip: 'elimina azienda',
                                    editTooltip: 'modifica azienda',
                                    filterRow: {
                                        filterTooltip: 'Filtro'
                                    },
                                    editRow:{
                                        deleteText: 'Sei sicuro di voler eliminare questa azienda?',
                                        cancelTooltip: 'Annulla',
                                        saveTooltip: 'Salva'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>);
    }
}