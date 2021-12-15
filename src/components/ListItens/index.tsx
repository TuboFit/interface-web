import * as React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography, ListItemAvatar, Grid } from '@mui/material';
import { ListItensContainer } from './styles';
import { turbofit_api } from '../../services/turbo_fit_api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, FormActions } from '../../contexts/FormContext';
import { EditarAluno } from '../../pages/Alunos/Editar';
import { EditarProfessor } from '../../pages/Professores/Editar';
type Props = {
    itens: any
    route: string;
    update: () => void;
}

export const ListItens = ({ itens, route, update }: Props) => {
    const [editAluno, setEditAluno] = React.useState(false);
    const [editProfessor, setEditProfessor] = React.useState(false);
    const { dispatch } = useForm();
    async function handleDelete(id: string, evt: React.MouseEvent<HTMLDivElement>) {
        evt.stopPropagation()
        return await turbofit_api.delete(`${route}/${id}`)
            .then(() => update())
            .catch(e => console.log(e))
    }

    function handleEdit(item: any, evt: React.MouseEvent<HTMLDivElement>) {
        evt.stopPropagation()
        if (!item.cref) {
            dispatch({
                type: FormActions.setDadosPessoais,
                payload: item.dados
            })
            setEditAluno(true)
        } else if (item.cref) {
            dispatch({
                type: FormActions.setDadosPessoais,
                payload: item.dados
            })
            setEditProfessor(true)
        } else {
            setEditAluno(false)
            setEditProfessor(false)
        }

    }

    return (
        <>
            {editAluno && <EditarAluno />}
            {editProfessor && <EditarProfessor />}
            {!editAluno && !editProfessor &&
                <ListItensContainer>
                    {!!itens && itens.map((item: any) => (
                        <List key={item.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <Grid item xs={10} sm={12}>
                                <ListItem alignItems="flex-start" >
                                    <ListItemAvatar>
                                        <Avatar alt="Nome" sx={{ bgcolor: 'secondary.dark' }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.dados?.nome}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {`${item.dados?.email}`}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <Typography
                                        component='div'
                                        sx={{ cursor: 'pointer' }}
                                        onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => { handleDelete(item.id, evt) }}
                                    >
                                        <DeleteIcon />
                                    </Typography>
                                    <Typography
                                        component='div'
                                        sx={{ cursor: 'pointer' }}
                                        onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => { handleEdit(item, evt) }}
                                    >
                                        <EditIcon />
                                    </Typography>
                                </ListItem>
                            </Grid>
                        </List >
                    ))}
                </ListItensContainer>}

        </>
    );
}