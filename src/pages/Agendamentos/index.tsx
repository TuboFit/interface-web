import React, { useEffect, useState } from "react"
import { CircularProgress, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from "../../components/NavBar"
import { agendamentos_api } from "../../services/agendamentos_api"
import { toDateString, frendlyDate, frendlyPhone } from "../../utils/DataConfig"

type Agendamento = {
    quant: number
    events: Event[]
}
type Event = {
    nome: string;
    telefone: string;
    data: string
    obs: string
}


export const Agendamentos = () => {
    const [loading, setLoading] = useState(false)
    const [agendamentos, setAgendamentos] = useState<Agendamento>()
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const now = new Date()

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const startDate = toDateString(now)
    const handleGetData = async () => {
        setLoading(true)
        const response = await agendamentos_api.get(`events?start=${startDate}`)
            .then(res => res.data)
            .catch(e => alert(e))
            .finally(() => setLoading(false))
        setAgendamentos(response)
    }
    useEffect(() => {
        handleGetData()
    }, [])// eslint-disable-line
    return (
        <>
            <NavBar />
            <Container>
                <h1>Agendamentos</h1>
            </Container>
            {
                !loading ?
                    <Container sx={{ width: "80%" }}>
                        {agendamentos?.quant === 0 ? <p>Sem Agendamentos no momento</p> :
                            <Typography component="div">
                                {agendamentos?.events.map((item, index) =>
                                    <Accordion key={index} expanded={(expanded === 'panel' + index)} onChange={handleChange('panel' + index)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ color: 'text.primary', width: '33%', flexShrink: 0 }}>
                                                {item.nome}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>{`${frendlyDate(item.data)}`}</Typography>
                                            <Typography sx={{ color: 'text.secondary', marginLeft: '33%' }}>{`${frendlyPhone(item.telefone)}`}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {item.obs}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )}

                            </Typography>
                        }

                    </Container> :
                    <Container>
                        <CircularProgress sx={{ color: "secondary.main" }} />
                    </Container>
            }
        </>
    )
}