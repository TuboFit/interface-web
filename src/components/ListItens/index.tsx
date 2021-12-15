import * as React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography, ListItemAvatar, Grid } from '@mui/material';
import { ListItensContainer } from './styles';
import { turbofit_api } from '../../services/turbo_fit_api';

type Props = {
    itens: any
    options?: any
    route: string
}

export const ListItens = ({ itens, options, route }: Props) => {

    async function handleDelete(id: string) {
        await turbofit_api.delete(`${route}/${id}`)
            .then(() => {
                return window.location.reload()
            })
            .catch(e => console.log(e))
    }

    return (
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
                            <Typography component='div' onClick={() => { handleDelete(item.id) }} >
                                {options}
                            </Typography>
                        </ListItem>
                    </Grid>
                </List >
            ))}
        </ListItensContainer>
    );
}