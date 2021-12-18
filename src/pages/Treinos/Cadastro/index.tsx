import { useState } from "react"
import { Container } from "@material-ui/core"
import { Alert, Button, Chip, CircularProgress, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Treino } from "../../../@types/Treino"
import { Exercicio } from "../../../@types/Exercicio"
import { Add } from "@mui/icons-material";
import { turbofit_api } from "../../../services/turbo_fit_api";

export const CadastroTreino = () => {
    const userData = localStorage.getItem('@turbofit:userData')?.split(':')[11]?.slice(1, 14)
    const [loading, setLoading] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [error, setError] = useState('')
    const [cref, setCref] = useState<string>('')
    const [dia, setDia] = useState<string>('')
    const [nivel, setNivel] = useState<string>('')
    const [nomeExercicio, setNomeExercicio] = useState('')
    const [numeroRepeticoes, setNumeroRepeticoes] = useState('')
    const [grupMuscular, setGrupMuscular] = useState('')
    const [obs, setObs] = useState('')
    const [carga, setCarga] = useState('')
    const [treino, setTreino] = useState<Treino>()
    const [exercicios, setExercicios] = useState<Exercicio[]>([])

    function handleSetExercicios(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evt.preventDefault()
        if (exercicios.length === 0) {
            setExercicios([{
                nome: nomeExercicio,
                grupMuscular,
                numRepeticoes: numeroRepeticoes,
                carga,
                obs
            }])
        } else if (exercicios.length >= 1) {
            const oldData = exercicios
            oldData.push({
                nome: nomeExercicio,
                grupMuscular,
                numRepeticoes: numeroRepeticoes,
                carga,
                obs
            })
            setExercicios([...oldData])

        }
        setNomeExercicio('')
        setNumeroRepeticoes('')
        setCarga('')
        setObs('')
    }

    function handleDelete(item: any) {
        const itemRemove = exercicios.indexOf(item)
        if (itemRemove >= 0) {
            exercicios.splice(itemRemove, 1)
        }
        setExercicios([...exercicios])
    };



    function handleTreino() {
        setLoading(true)
        setTreino({
            crefProfessor: cref,
            dia,
            nivel,
            grupMuscular,
            exercicios: exercicios
        })
        if (treino) {
            turbofit_api.post("treinos", { ...treino })
                .then(() => setSucess(true))
                .catch(e => (setError(e.message)))
                .finally(() =>
                    setLoading(false)
                )
        }
    }
    return (
        <Container>
            <Grid sx={{ flexGrow: 1 }} container spacing={3} component="form">
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Paper variant="outlined" square sx={{ height: '80vh', width: 380, borderRadius: 2, padding: 2 }} >
                                <p>Dados de Treino</p>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="cref"
                                        name="cref"
                                        label="CREF"
                                        type="text"
                                        value={userData ? userData : cref}
                                        onChange={(e) => setCref(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="dia"
                                        name="dia"
                                        label="Dia"
                                        type="text"
                                        value={dia}
                                        onChange={(e) => setDia(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="grupMuscular"
                                        name="grupMuscular"
                                        label="Grupo Muscular"
                                        type="text"
                                        value={grupMuscular}
                                        onChange={(e) => setGrupMuscular(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <InputLabel id="nivel-label">Nivel</InputLabel>
                                    <Select
                                        required
                                        labelId='nivel-label'
                                        id="nivel"
                                        name="nivel"
                                        label="Nivel"
                                        value={nivel}
                                        fullWidth
                                    >
                                        <MenuItem value={'iniciante'} onClick={() => setNivel('iniciante')}>Iniciante</MenuItem>
                                        <MenuItem value={'intermediario'} onClick={() => setNivel('intermediario')}>Intermediario</MenuItem>
                                        <MenuItem value={'avancado'} onClick={() => setNivel('avancado')}>Avançado</MenuItem>
                                    </Select>
                                </Grid>
                                <Typography component="div" sx={{ marginTop: 2 }}>
                                    {error && <Alert variant="filled" severity="error">{error}</Alert>}
                                    {sucess && <Alert variant="filled" severity="success">{'Cadastrado com sucesso'}</Alert>}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper variant="outlined" square sx={{ height: '80vh', width: 380, borderRadius: 2, padding: 3 }} >
                                <p>Dados de Exercicios</p>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="nome"
                                        name="nome"
                                        label="Nome"
                                        type="text"
                                        value={nomeExercicio}
                                        onChange={(e) => setNomeExercicio(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="numeroRepeticoes"
                                        name="numeroRepeticoes"
                                        label="Numero de Repetições"
                                        type="text"
                                        value={numeroRepeticoes}
                                        onChange={(e) => setNumeroRepeticoes(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ padding: 2 }}>
                                    <TextField
                                        required
                                        id="carga"
                                        name="carga"
                                        label="Carga"
                                        type="text"
                                        value={carga}
                                        onChange={(e) => setCarga(e.target.value)}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ padding: 2 }}>
                                    <TextField
                                        required
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
                                <Button
                                    onClick={(e) => handleSetExercicios(e)}
                                >
                                    <Add />
                                </Button>
                                {exercicios.map((itemExercicio, index) =>
                                    <Chip
                                        key={itemExercicio.nome + index}
                                        label={itemExercicio.nome}
                                        onDelete={() => handleDelete(itemExercicio)}
                                        deleteIcon={<DeleteIcon />}
                                        variant="outlined"
                                    />
                                )}
                            </Paper>
                            <Button
                                variant="contained"
                                onClick={handleTreino}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {'Enviar'}
                                {loading && <CircularProgress size={20} sx={{ marginLeft: 1, color: "secondary.main" }} />}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </Container >
    )
}