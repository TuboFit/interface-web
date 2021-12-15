import axios from "axios";

export const agendamentos_api = axios.create({ baseURL: "https://agende-me.vercel.app/api" })