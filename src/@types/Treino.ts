import { Exercicio } from "./Exercicio";

export type Treino = {
    id?: string;
    grupMuscular: string;
    nome: string;
    nivel: string;
    crefProfessor: string;
    exercicios: Exercicio[];
}