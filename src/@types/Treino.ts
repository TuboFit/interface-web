import { Exercicio } from "./Exercicio";

export type Treino = {
    id?: string;
    grupMuscular: string;
    dia: string;
    nivel: string;
    crefProfessor: string;
    exercicios: Exercicio[];
}