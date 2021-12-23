import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Treino } from '../../@types/Treino';


function Row(props: { row: Treino }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ bgcolor: 'primary.main', color: 'secondary.main' }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.nome}
                </TableCell>
                <TableCell align="center">{row.grupMuscular}</TableCell>
                <TableCell align="center">{row.nivel}</TableCell>
                <TableCell align="center">{row.exercicios.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Exercicios
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {`CREF do Professor: ${row.crefProfessor}`}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dia</TableCell>
                                        <TableCell align="center">Nome</TableCell>
                                        <TableCell align="center">Grupo Muscular</TableCell>
                                        <TableCell align="center">Numero de Repetições</TableCell>
                                        <TableCell align="center">Observação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.exercicios?.map((exercicio) => (
                                        <TableRow key={exercicio.id}>
                                            <TableCell component="th" scope="row">
                                                {exercicio.dia === 'all' ? 'Todos os dias' : exercicio.dia}
                                            </TableCell>
                                            <TableCell align='center'>{exercicio.nome}</TableCell>
                                            <TableCell align='center'>{exercicio.grupMuscular}</TableCell>
                                            <TableCell align='center'>{exercicio.numRepeticoes}</TableCell>
                                            <TableCell align='center'>{exercicio.obs}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

type TableProps = {
    itens: any
}

export default function CollapsibleTable({ itens }: TableProps) {
    console.log(itens)
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nome Identicador</TableCell>
                        <TableCell align="center">Grupo Muscular</TableCell>
                        <TableCell align="center">Nível</TableCell>
                        <TableCell align="center">Qantidade de Exercicios</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itens?.map((row: any) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
