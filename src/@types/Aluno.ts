import { DadosPessoais } from "./DadosPessoais";
import { Treino } from "./Treino";
import { Usuario } from "./Usuario";

export type Aluno = {
    id?: string;
    peso: number;
    altura: number;
    idade: number;
    genero: 0 | 1;
    obs?: string;
    dados?: DadosPessoais;
    usuario?: Usuario;
    treinos?: Treino[]
}