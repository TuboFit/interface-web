import { Add as AddIcon, ArrowBack } from "@mui/icons-material"
import { Container, Fab } from "@mui/material"
import { useState } from "react"
import NavBar from "../../components/NavBar"
import { CadastroProfessores } from "./Cadastro"
import ListaProfessores from "./Listar"

export const Professores = () => {
    const [cadastro, setCadastro] = useState(false)
    return (
        <>
            <NavBar />
            <Container sx={{ color: 'background.paper' }}>
                <h1>Professores</h1>
                <Fab color="primary" aria-label="add" onClick={() => setCadastro((oldValue) => !oldValue)}>
                    {cadastro ? <ArrowBack sx={{ color: 'secondary.main' }} /> : <AddIcon sx={{ color: 'secondary.main' }} />}
                </Fab>
                {cadastro && <CadastroProfessores />}
                {!cadastro && <ListaProfessores />}
            </Container>
        </>
    )
}