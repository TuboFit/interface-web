import * as React from 'react';
import { ListItens } from '../../../components/ListItens';
import { turbofit_api } from '../../../services/turbo_fit_api';
import { Container } from './styles'
import { Alert, CircularProgress, Typography } from '@mui/material';
import { Aluno } from '../../../@types/Aluno';
import { FormProvider } from '../../../contexts/FormContext';

export default function ListaAlunos() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [alunos, setAlunos] = React.useState<Aluno[]>()
    const handleGetData = async () => {
        setLoading(true)
        await turbofit_api.get("alunos")
            .then(res => {
                setAlunos(res.data)
            }).catch(e => {
                setLoading(false)
                setError(true)
            }).finally(() => {
                setLoading(false)
            })
    }
    React.useEffect(() => {
        handleGetData()
    }, [])// eslint-disable-next-line
    return (
        <FormProvider>
            <Container >
                {!loading ? <ListItens update={handleGetData} itens={alunos} route='alunos' /> : <Container><CircularProgress sx={{ color: "secondary.main" }} /></Container>}
                {error ? <Alert variant="filled" severity="error">Erro ao carregar alunos</Alert> : null}
                {alunos?.length === 0 && <Typography>Nenhum aluno encontrado</Typography>}
            </Container>
        </FormProvider>
    );
}

