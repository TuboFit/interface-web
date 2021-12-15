import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { ListItens } from '../../../components/ListItens';
import { turbofit_api } from '../../../services/turbo_fit_api';
import { Container } from './styles';
import { Professor } from '../../../@types/Professor';


export default function ListaProfessores() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [professores, setProfessores] = React.useState<Professor[]>()
    const handleGetData = async () => {
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
        <Container>
            {!loading ? <ListItens itens={professores} options={<DeleteIcon />} route='professores' /> : <Container><CircularProgress sx={{ color: "secondary.main" }} /></Container>}
            {error ? <Alert variant="filled" severity="error">Erro ao carregar alunos</Alert> : null}
            {professores?.length === 0 && <Typography>Nenhum professor encontrado</Typography>}
        </Container>
    );
}