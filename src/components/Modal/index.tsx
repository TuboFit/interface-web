import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useForm } from '../../contexts/FormContext';
import { frendlyCPF } from '../../utils/DataConfig';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

type Props = {
    handleCloseDialog: () => void
}

export default function CustomizedDialogs({ handleCloseDialog }: Props) {
    const { state } = useForm()
    const item = { ...state.professor } as any
    return (
        <div>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog} >
                    {item.dados?.nome}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {state.professor.cref}
                    </Typography>
                    <Typography gutterBottom>
                        Email: {state.professor.usuario?.email}
                    </Typography>
                    <Typography gutterBottom>
                        CPF: {frendlyCPF(state.professor.dados?.cpf)}
                    </Typography>
                    <Typography gutterBottom>
                        Endereco: {state.professor.dados?.endereco.logradouro},  {state.professor.dados?.endereco.numero}, {state.professor.dados?.endereco.bairro} <br />
                        Cidade: {state.professor.dados?.endereco.cidade}   Estado: {state.professor.dados?.endereco.uf}
                    </Typography>
                    {state.professor.usuario?.type === 'aluno' ?
                        <>
                            <Typography gutterBottom>
                                Idade: {item.idade} Peso:{item.peso + 'Kg'} Altura:{item.altura + 'cm'}
                            </Typography>
                            <Typography gutterBottom>
                                IMC: {item.imc.toFixed(1)}
                            </Typography>
                            <Typography gutterBottom>
                                TMB: {item.tmb.toFixed(1)}
                            </Typography>
                            <Typography gutterBottom>
                                Gênero: {item.genero === 1 ? 'Masculino' : 'Feminino'}
                            </Typography>
                        </>
                        : null}
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}