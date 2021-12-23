import * as React from 'react';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { turbofit_api } from '../../../services/turbo_fit_api';
import { Container } from './styles';
import { FormProvider } from '../../../contexts/FormContext';
import { Treino } from '../../../@types/Treino';
import CollapsibleTable from '../../../components/Table';

export function ListarTreinos() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [treinos, setTreinos] = React.useState<Treino[]>()
    const cref = localStorage.getItem('@turbofit:userData')?.split(':')[11]?.slice(1, 13)
    const handleGetData = async () => {
        setLoading(true)
        await turbofit_api.get(cref ? `treinos/treinosby/teacher?cref=${cref}` : "treinos").then(res => {
            setTreinos(res.data)
        }).catch(e => {
            setLoading(false)
            setError(true)
        }).finally(() => {
            setLoading(false)
        })
    }
    console.log(treinos)
    React.useEffect(() => {
        handleGetData()// eslint-disable-next-line
    }, [cref])
    return (
        <FormProvider>
            <Container>
                {!loading ? <CollapsibleTable itens={treinos} /> : <Container><CircularProgress sx={{ color: "secondary.main" }} /></Container>}
                {error ? <Alert variant="filled" severity="error">Erro ao carregar alunos</Alert> : null}
                {(treinos?.length === 0 || !treinos) && <Typography>Nenhum treino encontrado</Typography>}
            </Container>
        </FormProvider>
    );
}