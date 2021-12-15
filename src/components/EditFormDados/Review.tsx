import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useForm } from '../../contexts/FormContext';
import { Button } from '@mui/material';

export default function Review() {
    const { state, editDados } = useForm();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    async function handleSubmitForm() {
        setLoading(true)
        return await editDados(state.dadosPessoais)
            .then(() => setLoading(false))
            .catch(e => setError(e.message))
            .finally(() => {
                setLoading(false)
                navigate("/app/alunos")
            })
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
            <Button
                variant="contained"
                onClick={handleSubmitForm}
                sx={{ mt: 3, ml: 1 }}
            >
                {'Editar'}
                {loading && <CircularProgress size={20} sx={{ marginLeft: 1, color: "secondary.main" }} />}
            </Button>

            <Typography component="div" sx={{ marginTop: 2 }}>
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
            </Typography>

        </React.Fragment>
    );
}