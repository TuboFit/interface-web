import { Exercicio } from "./Exercicio";

export type Treino = {
    grupMuscular: string;
    dia: string;
    nivel: string;
    crefProfessor: string;
    exercicios: Exercicio[];
}