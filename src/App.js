import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import About from "./components/about.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardBackend from "./components/board-backend.component";
import BoardAzienda from "./components/board-azienda.component";
import BoardDipendenti from "./components/board-dipendenti.component";
import BoardPresenze from "./components/board-presenze.component";
import BoardCredito from "./components/board-credito.component";
import BoardCorsi from "./components/board-corsi.component";
import BoardCalendari from "./components/board-calendari.component";
import BoardGestioneCalendari from "./components/board-gestionecalendari.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        isAdminAzienda: user.roles.includes("ROLE_ADMIN_AZIENDA"),
        isUserAzienda: user.roles.includes("ROLE_USER_AZIENDA"),
        isAttestatore: user.roles.includes("ROLE_ATTESTATORE"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      isAdminAzienda: false,
      isUserAzienda: false,
      isAttestatore: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, isAdminAzienda, isUserAzienda, isAttestatore } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              F4P0
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  Informazioni
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/backend"} className="nav-link">
                      Backend Board
                    </Link>
                  </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/anagraficaCorsi"} className="nav-link">
                    Anagrafica Corsi
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/gestionecalendari"} className="nav-link">
                      Gestione Calendari
                    </Link>
                  </li>
              )}
              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Registra Utente
                    </Link>
                  </li>
              )}
              {(isAdminAzienda || isUserAzienda)&& (
                  <li className="nav-item">
                    <Link to={"/azienda"} className="nav-link">
                      Anagrafica Azienda
                    </Link>
                  </li>
              )}

              {(isAdminAzienda || isUserAzienda)&& (
                  <li className="nav-item">
                    <Link to={"/dipendenti"} className="nav-link">
                      Anagrafica Dipendenti
                    </Link>
                  </li>
              )}

              {(isAdminAzienda || isUserAzienda)&& (
                  <li className="nav-item">
                    <Link to={"/presenze"} className="nav-link">
                      Gestione Presenze
                    </Link>
                  </li>
              )}

              {isAttestatore && (
                  <li className="nav-item">
                    <Link to={"/creditoImposta"} className="nav-link">
                      Calcolo Credito Imposta
                    </Link>
                  </li>
              )}

              {isAttestatore && (
                  <li className="nav-item">
                    <Link to={"/calendari"} className="nav-link">
                      Calendari
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/backend" component={BoardBackend} />
              <Route path="/azienda" component={BoardAzienda} />
              <Route path="/dipendenti" component={BoardDipendenti} />
              <Route path="/presenze" component={BoardPresenze} />
              <Route path="/creditoImposta" component={BoardCredito} />
              <Route path="/anagraficaCorsi" component={BoardCorsi} />
              <Route path="/calendari" component={BoardCalendari} />
              <Route path="/gestionecalendari" component={BoardGestioneCalendari} />
              <Route path="/about" component={About} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
