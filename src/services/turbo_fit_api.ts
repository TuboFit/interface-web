import axios from "axios";

export const turbofit_api = axios.create({ baseURL: "https://turbofit-api.herokuapp.com" })