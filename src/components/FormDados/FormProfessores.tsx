import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormActions, useForm } from '../../contexts/FormContext';
import { Professor } from '../../@types/Professor';

type PropsForms = {
    title: string;
}

export default function FormProfessor({ title }: PropsForms) {
    const { state, dispatch } = useForm()
    const [professor, SetProfessor] = React.useState<Professor>({} as Professor)
    const [cref, setCref] = React.useState(state.professor.cref);
    const [password, setPassword] = React.useState<string | undefined>(state.professor.usuario?.password)

    function handleProfessor(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        SetProfessor({
            cref,
            usuario: {
                email: state.dadosPessoais.email,
                password
            }
        })
        dispatch({
            type: FormActions.setProfessor,
            payload: professor
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3} component="form" onChange={handleProfessor}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="cref"
                        name="cref"
                        label="CREF"
                        value={cref}
                        onChange={(e) => setCref(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}