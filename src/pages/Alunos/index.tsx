import { Add as AddIcon, ArrowBack } from "@mui/icons-material"
import { Container, Fab } from "@mui/material"
import { useState } from "react"
import NavBar from "../../components/NavBar"
import { CadastroAluno } from "./Cadastro"
import ListaAlunos from "./Listar"

export const Alunos = () => {
    const [cadastro, setCadastro] = useState(false)
    return (
        <>
            <NavBar />
            <Container >
                <h1>Alunos</h1>
                <Fab color="primary" aria-label="add" onClick={() => setCadastro((oldValue) => !oldValue)}>
                    {cadastro ? <ArrowBack sx={{ color: 'secondary.main' }} /> : <AddIcon sx={{ color: 'secondary.main' }} />}
                </Fab>
                {cadastro && <CadastroAluno />}
                {!cadastro && <ListaAlunos />}

            </Container>
        </>
    )
}