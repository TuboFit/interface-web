//criando contexto para captação de 
//dados de cadastro de aluno e professor 
//antes de enviar para o servidor

import { createContext, ReactNode, useCallback, useContext, useReducer } from 'react';
import { Aluno } from '../@types/Aluno';
import { DadosPessoais } from '../@types/DadosPessoais';
import { Professor } from '../@types/Professor';
import { turbofit_api } from '../services/turbo_fit_api';

//criação de estados
type State = {
    currentStep: number;
    dadosPessoais: DadosPessoais;
    aluno: Aluno;
    professor: Professor;
}

type Action = {
    type: FormActions;
    payload: any;
}

type ContextType = {
    state: State;
    dispatch: (action: Action) => void
    cadastroAluno: (dadosPessoais: DadosPessoais, aluno: Aluno) => Promise<void>
    editDadosAlunos: (dadosPessoais: DadosPessoais, aluno: Aluno) => Promise<void>
    cadastroProfessor: (dadosPessoais: DadosPessoais, professor: Professor) => Promise<void>
    editDadosProfessor: (dadosPessoais: DadosPessoais, professor: Professor) => Promise<void>
}

type FormProviderProps = {
    children: ReactNode;
}

//dados iniciais
const initialData: State = {
    currentStep: 0,
    dadosPessoais: {
        nome: '',
        cpf: '',
        telefone: '',
        endereco: {
            logradouro: '',
            bairro: '',
            numero: '',
            cidade: '',
            uf: ''
        }
    },
    aluno: {
        altura: 0,
        idade: 0,
        genero: 0,
        peso: 0,
        obs: '',
        usuario: {
            email: '',
            password: '',
            type: ''
        }

    },
    professor: {
        cref: '',
        usuario: {
            email: '',
            password: '',
            type: ''
        }
    }
}

//context
const FormContext = createContext<ContextType | undefined>(undefined);

export enum FormActions {
    setCurrentStep,
    setDadosPessoais,
    setAluno,
    setProfessor
}

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FormActions.setCurrentStep:
            return { ...state, currentStep: action.payload }
        case FormActions.setDadosPessoais:
            return { ...state, dadosPessoais: action.payload }
        case FormActions.setAluno:
            state.aluno.id = action.payload.id
            return { ...state, aluno: action.payload }
        case FormActions.setProfessor:
            state.aluno.id = action.payload.id
            return { ...state, professor: action.payload }
        default:
            return state
    }
}

//Provider
export const FormProvider = ({ children }: FormProviderProps) => {
    const [state, dispatch] = useReducer(formReducer, initialData)

    const cadastroAluno = useCallback(async (dados: DadosPessoais, aluno: Aluno) => {
        await turbofit_api.post('alunos', {
            ...aluno,
            dados: {
                ...dados
            }
        })
    }, [])

    const editDadosAlunos = useCallback(async (dados: DadosPessoais, aluno: Aluno) => {
        await turbofit_api.patch(`alunos/${state.aluno.id} `, {
            ...aluno,
            dados: {
                ...dados
            }
        })
            .then()
            .catch(e => new Error(e.message))
        // eslint-disable-next-line 
    }, [])

    const editDadosProfessor = useCallback(async (dados: DadosPessoais, professor: Professor) => {
        await turbofit_api.patch(`professores/${state.professor.id} `, {
            ...professor,
            dados: {
                ...dados
            }
        }).then().catch(e => new Error(e.message))
        // eslint-disable-next-line 
    }, [])

    const cadastroProfessor = useCallback(async (dados: DadosPessoais, professor: Professor) => {
        await turbofit_api.post('professores', {
            ...professor,
            dados: {
                ...dados
            }
        })
    }, [])

    return (
        <FormContext.Provider value={{
            state,
            dispatch,
            cadastroAluno,
            editDadosAlunos,
            cadastroProfessor,
            editDadosProfessor
        }}>
            {children}
        </FormContext.Provider>
    )
}

//Hook
export const useForm = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error("useForm deve ser usado dentro do FormProvider")
    }
    return context
}