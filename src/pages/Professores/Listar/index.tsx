import * as React from 'react';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { ListItens } from '../../../components/ListItens';
import { turbofit_api } from '../../../services/turbo_fit_api';
import { Container } from './styles';
import { Professor } from '../../../@types/Professor';
import { FormProvider } from '../../../contexts/FormContext';

export default function ListaProfessores() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [professores, setProfessores] = React.useState<Professor[]>()
    const handleGetData = async () => {
        setLoading(true)
        await turbofit_api.get("professores").then(res => {
            setProfessores(res.data)
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
            <Container>
                {!loading ? <ListItens update={handleGetData} itens={professores} route='professores' /> : <Container><CircularProgress sx={{ color: "secondary.main" }} /></Container>}
                {error ? <Alert variant="filled" severity="error">Erro ao carregar alunos</Alert> : null}
                {professores?.length === 0 && <Typography>Nenhum professor encontrado</Typography>}
            </Container>
        </FormProvider>
    );
}