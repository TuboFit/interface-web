import { Add as AddIcon, ArrowBack } from "@mui/icons-material"
import { Container, Fab } from "@mui/material"
import { useState } from "react"
import NavBar from "../../components/NavBar"
import { CadastroTreino } from "./Cadastro"
import { ListarTreinos } from "./Listar"


export const Treinos = () => {
    const [cadastro, setCadastro] = useState(false)
    return (
        <>
            <NavBar />
            <Container >
                <h1>Treinos</h1>
                <Fab color="primary" aria-label="add" onClick={() => setCadastro((oldValue) => !oldValue)}>
                    {cadastro ? <ArrowBack sx={{ color: 'secondary.main' }} /> : <AddIcon sx={{ color: 'secondary.main' }} />}
                </Fab>
                {cadastro && <CadastroTreino />}
                {!cadastro && <ListarTreinos />}

            </Container>
        </>
    )
}