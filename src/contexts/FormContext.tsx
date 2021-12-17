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
    editDados: (dadosPessoais: DadosPessoais) => Promise<void>
    cadastroProfessor: (dadosPessoais: DadosPessoais, professor: Professor) => Promise<void>
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
        id: '',
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
    setProfessor,
}

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FormActions.setCurrentStep:
            return { ...state, currentStep: action.payload }
        case FormActions.setDadosPessoais:
            state.dadosPessoais.id = action.payload.id;
            console.log(state.dadosPessoais.id)
            return { ...state, dadosPessoais: action.payload }
        case FormActions.setAluno:
            return { ...state, aluno: action.payload }
        case FormActions.setProfessor:
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

    const editDados = useCallback(async (dados: DadosPessoais) => {
        await turbofit_api.patch(`dados/${state.dadosPessoais?.id}`, {
            ...dados
        })
    }, [state.dadosPessoais?.id])

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
            editDados,
            cadastroProfessor

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