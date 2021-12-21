import * as React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography, ListItemAvatar, Grid, Tooltip } from '@mui/material';
import { ListItensContainer } from './styles';
import { turbofit_api } from '../../services/turbo_fit_api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, FormActions } from '../../contexts/FormContext';
import { EditarAluno } from '../../pages/Alunos/Editar';
import { EditarProfessor } from '../../pages/Professores/Editar';
import { Cancel } from '@mui/icons-material';
import CustomizedDialogs from '../Modal';
type Props = {
    itens: any
    route: string;
    update: () => void;
}

export const ListItens = ({ itens, route, update }: Props) => {
    const [editAluno, setEditAluno] = React.useState(false);
    const [editProfessor, setEditProfessor] = React.useState(false);
    const [modal, setModal] = React.useState(false);
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

    function handleOpenModal(item: any) {
        setModal(true)
        dispatch({
            type: FormActions.setProfessor,
            payload: item
        })
    }

    function handleCloseModal() {
        setModal(false)
    }

    return (
        <>
            {modal && <CustomizedDialogs handleCloseDialog={handleCloseModal} />}
            {
                editAluno && <Typography
                    component='div'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setEditAluno(false)}
                >
                    <Tooltip title="Cancelar">
                        <Cancel />
                    </Tooltip>
                </Typography>
            }
            {
                editProfessor && <Typography
                    component='div'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setEditProfessor(false)}
                >
                    <Tooltip title="Cancelar">
                        <Cancel />
                    </Tooltip>
                </Typography>
            }
            {editAluno && <EditarAluno />}
            {editProfessor && <EditarProfessor />}
            {!editAluno && !editProfessor &&
                <ListItensContainer>
                    {!!itens && itens.map((item: any) => (
                        <List
                            key={item.id}
                            sx={{ width: '100%', maxWidth: 360, marginTop: 1, borderRadius: 2, bgcolor: 'background.paper' }}
                        >
                            <Grid item xs={10} sm={12}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{ cursor: 'pointer', color: "#000" }}
                                    onClick={() => handleOpenModal(item)}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Nome" sx={{ bgcolor: 'secondary.dark', color: '#FFF' }} />
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
                                                    {`${item.usuario.email}`}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <Typography
                                        component='div'
                                        sx={{ cursor: 'pointer' }}
                                        onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => { handleDelete(item.id, evt) }}
                                    >
                                        <Tooltip title="Deletar">
                                            <DeleteIcon />
                                        </Tooltip>
                                    </Typography>
                                    <Typography
                                        component='div'
                                        sx={{ cursor: 'pointer' }}
                                        onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => { handleEdit(item, evt) }}
                                    >
                                        <Tooltip title="Editar">
                                            <EditIcon />
                                        </Tooltip>
                                    </Typography>
                                </ListItem>
                            </Grid>
                        </List >
                    ))}
                </ListItensContainer>
            }

        </>
    );
}