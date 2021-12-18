import * as React from 'react';
import { Alert, CircularProgress, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useForm } from '../../contexts/FormContext';
import { Button } from '@mui/material';
import { frendlyCPF } from '../../utils/DataConfig';

export default function Review() {
    const { state, editDados } = useForm();
    const [error, setError] = React.useState('');
    const [sucess, setSucess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function handleSubmitForm() {
        setLoading(true)
        return await editDados(state.dadosPessoais)
            .then(() => setSucess(true))
            .catch(e => setError(e.message))
            .finally(() => {
                setLoading(false)
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
            <ListItemText primary="CPF" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {frendlyCPF(state.dadosPessoais.cpf)}
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
                {sucess && <Alert variant="filled" severity="success">{'Atualizado com sucesso'}</Alert>}
            </Typography>

        </React.Fragment>
    );
}