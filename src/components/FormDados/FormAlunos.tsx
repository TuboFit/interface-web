import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FormActions, useForm } from '../../contexts/FormContext';
import { Aluno } from '../../@types/Aluno';

export default function FormAlunos() {
    const { state, dispatch } = useForm();
    const [aluno, setAluno] = React.useState<Aluno>({} as Aluno);
    const [idade, setIdade] = React.useState<number>(state.aluno.idade)
    const [peso, setPeso] = React.useState<number>(state.aluno.peso)
    const [altura, setAltura] = React.useState<number>(state.aluno.altura)
    const [obs, setObs] = React.useState<string | undefined>(state.aluno.obs)
    const [genero, setGenero] = React.useState(state.aluno.genero)
    const [email, setEmail] = React.useState<string | undefined>(state.aluno.usuario?.email)
    const [password, setPassword] = React.useState<string | undefined>(state.aluno.usuario?.password)


    function handleSubmitAlunos(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setAluno({
            idade,
            peso,
            altura,
            obs,
            genero,
            usuario: {
                email,
                password,
                type: 'aluno'
            }
        })
        dispatch({
            type: FormActions.setAluno,
            payload: aluno
        })
    }
    return (
        <React.Fragment>
            <Grid container spacing={3} component="form" onChange={handleSubmitAlunos}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="idade"
                        name="idade"
                        label="Idade"
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value as unknown as number)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="peso"
                        name="peso"
                        label="Peso(kg)"
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value as unknown as number)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="altura"
                        name="altura"
                        label="Altura(cm)"
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value as unknown as number)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <Grid item xs={12} sm={6}>
                    <InputLabel id="genero-label">Gênero</InputLabel>
                    <Select
                        required
                        labelId='genero-label'
                        id="genero"
                        name="genero"
                        label="Geneno"
                        value={genero}
                        fullWidth
                    >
                        <MenuItem value={0} onClick={() => setGenero(0)}>Feminino</MenuItem>
                        <MenuItem value={1} onClick={() => setGenero(1)}>Masculino</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="obs"
                        name="obs"
                        label="Observações"
                        type="text"
                        value={obs}
                        onChange={(e) => setObs(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} >
                    <InputLabel id="treino-label">Treino</InputLabel>
                    <Select
                        labelId='treino-label'
                        id="treinos"
                        name="treinos"
                        value={""}
                        label="Treino"
                        onChange={() => { }}
                        fullWidth
                    >
                        <MenuItem value={0}>{""}</MenuItem>
                        <MenuItem value={1}>{""}</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}