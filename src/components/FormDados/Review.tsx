import * as React from 'react';
import { Alert, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useForm } from '../../contexts/FormContext';
import { Button } from '@mui/material';

export default function Review() {
    const { state, cadastroAluno, cadastroProfessor } = useForm();
    const [error, setError] = React.useState('');

    async function handleSubmitForm() {
        if (!state.professor.cref) {
            try {
                return await cadastroAluno(state.dadosPessoais, state.aluno)
            } catch (e: any) {
                return setError(e.message)
            }
        }
        return await cadastroProfessor(state.dadosPessoais, state.professor)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Confirmação
            </Typography>
            <ListItemText primary="Nome" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {state.dadosPessoais.nome}
            </Typography>
            <ListItemText primary="Endereco" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {`${state.dadosPessoais.endereco.logradouro}, 
                ${state.dadosPessoais.endereco.numero},
                ${state.dadosPessoais.endereco.bairro},
                ${state.dadosPessoais.endereco.cidade},
                ${state.dadosPessoais.endereco.uf}`}
            </Typography>
            {state.professor.cref ? (
                <>
                    <ListItemText primary="CREF" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {state.professor.cref}
                    </Typography>
                </>
            ) : (
                <>
                    <ListItemText primary="Genero" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {state.aluno.genero === 1 ? "Masculino" : 'Feminino'}
                    </Typography>
                    <ListItemText primary="Informações" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {`Idade: ${state.aluno.idade}, Peso:${state.aluno.peso}, Altura:${state.aluno.altura}`}
                    </Typography>
                    <ListItemText primary="Observações" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {state.aluno.obs ? state.aluno.obs : "Sem observações"}
                    </Typography>
                </>
            )}
            <Button
                variant="contained"
                onClick={handleSubmitForm}
                sx={{ mt: 3, ml: 1 }}
            >
                {'Cadastrar'}
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
            </Button>

        </React.Fragment>
    );
}