import { DadosPessoais } from "./DadosPessoais";
import { Usuario } from "./Usuario";

export type Professor = {
    id?: string;
    cref: string;
    dados?: DadosPessoais;
    usuario?: Usuario;
}