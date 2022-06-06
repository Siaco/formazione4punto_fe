import React, {Component, forwardRef} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import MaterialTable from "material-table";
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

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      attestatori: [],
      aziende: [],
      columns: [ {title: "id", field: "id", hidden:true},
        {title: "Email", field: "email", hidden:false},
        {title: "Username", field: "username", hidden:false},
        {title: "Password", field: "password", hidden:true}]
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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

    UserService.getAttestatori().then(
        response => {
          this.setState({
            attestatori: response.data
          });
        },
        error => {
          this.setState({
            attestatori:
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

    UserService.getAziende().then(
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
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <div className="card">
            <MaterialTable
                title="Attestatori"
                columns={this.state.columns}
                data={this.state.attestatori}
                icons={tableIcons}
                detailPanel={rowData => {
                  return (
                      <UtilsAttestatore idAttestatore={rowData.id} listAziende={this.state.aziende}/>
                  )
                }}
                localization={{
                  pagination: {
                    labelDisplayedRows: '{from}-{to} di {count}'
                  },
                  toolbar: {
                    nRowsSelected: '{0} attestatore(i) selezionati',
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
          </div>
        </header>
      </div>
    );
  }
}


class UtilsAttestatore extends Component {

  associaAziende(aziendeSelezionate){
    var idAttestatore = this.props.idAttestatore;
    UserService.associaAziende(idAttestatore, aziendeSelezionate).then(
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

  }

  render() {
    var listAziende = this.props.listAziende;
    var columnsListAziende = [ {title: "id", field: "id", hidden:true},
                               {title: "Nome", field: "nome", hidden:false}];

    return (
          <div className="card">
            <MaterialTable
                title="Aziende"
                columns={columnsListAziende}
                data={listAziende}
                icons={tableIcons}
                options={{
                  selection: true
                }}
                actions={[
                  {
                    tooltip: 'Associa aziende',
                    icon: Check,
                    onClick: (evt, data) => this.associaAziende(data)
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
    )
  }
}