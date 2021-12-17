import { useState } from "react"
import { Container } from "@material-ui/core"
import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material"

export const CadastroTreino = () => {
    const userData = localStorage.getItem('@turbofit:userData')?.split(':')[11]?.slice(1, 14)
    const [cref, setCref] = useState<string>('')
    const [dia, setDia] = useState<string>('')
    const [nivel, setNivel] = useState<string>('')
    return (
        <Container>
            <Grid sx={{ flexGrow: 1 }} container spacing={3} component="form">
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Paper variant="outlined" square sx={{ height: '60vh', width: 380, borderRadius: 2, padding: 3 }} >
                                <p>Dados de Treino</p>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <InputLabel id="nivel-label">Nivel</InputLabel>
                                    <Select
                                        required
                                        labelId='genero-label'
                                        id="genero"
                                        name="genero"
                                        label="Geneno"
                                        value={nivel}
                                        fullWidth
                                    >
                                        <MenuItem value={'iniciante'} onClick={() => setNivel('iniciante')}>Iniciante</MenuItem>
                                        <MenuItem value={'intermediario'} onClick={() => setNivel('intermediario')}>Intermediario</MenuItem>
                                        <MenuItem value={'avancado'} onClick={() => setNivel('avancado')}>Avançado</MenuItem>
                                    </Select>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper variant="outlined" square sx={{ height: '60vh', width: 380, borderRadius: 2, padding: 3 }} >
                                <p>Dados de Exercicios</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Button>Enviar</Button>
            </Grid>
        </Container >
    )
}