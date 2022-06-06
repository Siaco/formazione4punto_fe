import axios from "axios";
import authHeader from "./auth-header";

//PROD
//const API_URL = "/api/";

//DEV
const API_URL = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getAziendaBoard() {
    return axios.get(API_URL + "azienda", { headers: authHeader() });
  }

  getAziende() {
    return axios.get(API_URL + "aziende", { headers: authHeader() });
  }

  async getSedi(){
    const res = await axios.get(API_URL + "sedi", { headers: authHeader() });
    return res;
  }

  getDipendentiBoard(){
    return axios.get(API_URL + "dipendente", { headers: authHeader() });
  }

  getPresenzeBoard(){
    return axios.get(API_URL + "presenze", { headers: authHeader() });
  }

  getCorsiBoard(){
    return axios.get(API_URL + "corsi", { headers: authHeader() });
  }

  async salvaAzienda(azienda){
    const res = await axios.post(API_URL + "azienda", azienda, { headers: authHeader() });
    return res;
  }

  async produciRegistriFnc(){
    const res = await axios.post(API_URL + "fnc/registri", null, { headers: authHeader() });
    return res;
  }

  async produciTestFnc(){
    const res = await axios.post(API_URL + "fnc/test", null, { headers: authHeader() });
    return res;
  }

  async produciDocumentazioneFnc(){
    const res = await axios.post(API_URL + "fnc/documentazione", null, { headers: authHeader() });
    return res;
  }

  async salvaSedi(sedi){
    const res = await axios.post(API_URL + "sedi", sedi, { headers: authHeader() });
    return res;
  }

  async associaAziende(idAttestatore, aziende){
    const res = await axios.post(API_URL + "associaAziende/"+idAttestatore, aziende, { headers: authHeader() });
    return res;
  }

  async generaCalendari(aziende){
    const res = await axios.post(API_URL + "generacalendari", aziende, { headers: authHeader() });
    return res;
  }

  async generaRegistri(aziende){
    const res = await axios.post(API_URL + "generaregistri", aziende, { headers: authHeader() });
    return res;
  }

  async importaDipendenti(file){
    let formData = new FormData();
    formData.append("dataFile",file, "elenco");
    const res = await axios.post(API_URL + "importaDipendenti", formData, { headers: authHeader() });
    return res;
  }

  async aggiungiDipendente(dipendente){
    const res = await axios.post(API_URL + "aggiungiDipendenti", [dipendente], { headers: authHeader() });
    return res;
  }

  async deleteDipendente(id){
    const res = await axios.post(API_URL + "rimuoviDipendenti", [id], { headers: authHeader() });
    return res;
  }

  async downloadTemplateDipendenti(){
      const res = await axios.get(API_URL + "templateDipendenti", { headers: authHeader(), responseType: 'blob' });
      return res;
  }

  async importaPresenze(file){
    let formData = new FormData();
    formData.append("dataFile",file, "elenco");
    const res = await axios.post(API_URL + "importaPresenze", formData, { headers: authHeader() });
    return res;
  }

  async downloadTemplatePresenze(anno){
    const res = await axios.post(API_URL + "templatePresenze", [anno], { headers: authHeader(), responseType: 'blob' });
    return res;
  }

  async getDenominazioneAteco(ateco){
    //const res = await axios.get("https://search.codiceateco.it/atecosearch?q="+ateco, {headers: cors_header});
    const res = await axios.get(API_URL+"descrizione/"+ateco, { headers: authHeader() });
    return res;
  }

  async getAttestatori(){
    const res = await axios.get(API_URL + "attestatori", { headers: authHeader() });
    return res;
  }

  async getAziendeAssociate(){
    let res = await axios.get(API_URL + "aziendeAssociate", { headers: authHeader() });
    return res;
  }

  async calcolaCreditoImposta(idAzienda, percentuale, anno){
    const res = await axios.post(API_URL + "calcolacredito/"+idAzienda+"/"+anno,  [percentuale], { headers: authHeader() });
    return res;
  }

  async salvaPercentuale(idAzienda, percentuale, anno){
    const res = await axios.post(API_URL + "salvapercentuale/"+idAzienda+"/"+anno,  [percentuale], { headers: authHeader() });
    return res;
  }

  async caricaCreditoImposta(idAzienda, anno){
    const res = await axios.post(API_URL + "caricacredito/"+idAzienda+"/"+anno, null, { headers: authHeader() });
    return res;
  }

  async aggiungiCorso(corso){
    const res = await axios.post(API_URL + "addCorso",  [corso], { headers: authHeader() });
    return res;
  }

  async deleteCorso(corso){
    const res = await axios.post(API_URL + "deleteCorso",  [corso], { headers: authHeader() });
    return res;
  }

  async getCalendari(){
    let res = await axios.get(API_URL + "calendari", { headers: authHeader() });
    return res;
  }

  async richiediCalendari(idAzienda, anno){
    const res = await axios.post(API_URL + "richiedicalendari/"+idAzienda+"/"+anno, null, { headers: authHeader() });
    return res;
  }

  async downloadRegistro(id){
    const res = await axios.post(API_URL + "getregistri", [id], { headers: authHeader(), responseType: 'blob' });
    return res;
  }

  async downloadRelazione(id){
    const res = await axios.post(API_URL + "getrelazione", [id], { headers: authHeader(), responseType: 'blob' });
    return res;
  }

  async downloadAttestati(id){
    const res = await axios.post(API_URL + "getattestati", [id], { headers: authHeader(), responseType: 'blob' });
    return res;
  }

  async downloadProspetto(id){
    const res = await axios.post(API_URL + "getprospetto", [id], { headers: authHeader(), responseType: 'blob' });
    return res;
  }
}

export default new UserService();
