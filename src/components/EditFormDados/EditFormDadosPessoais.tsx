import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormActions, useForm } from '../../contexts/FormContext';
import { DadosPessoais } from '../../@types/DadosPessoais';

type PropsForms = {
    title: string;
}

export default function EditFormDadosPessoais({ title }: PropsForms) {
    const { state, dispatch } = useForm();
    const [formValues, setFormValues] = React.useState<DadosPessoais>({} as DadosPessoais)
    const [nome, setNome] = React.useState<string>(state.dadosPessoais.nome);
    const [telefone, setTelefone] = React.useState<string>(state.dadosPessoais.telefone);
    const [cpf, setCpf] = React.useState<string>(state.dadosPessoais.cpf);
    const [logradouro, setLogradouro] = React.useState<string>(state.dadosPessoais.endereco?.logradouro);
    const [bairro, setBairro] = React.useState<string>(state.dadosPessoais.endereco?.bairro);
    const [numero, setNumero] = React.useState<string>(state.dadosPessoais.endereco?.numero);
    const [cidade, setCidade] = React.useState<string>(state.dadosPessoais.endereco?.cidade);
    const [uf, setUf] = React.useState<string>(state.dadosPessoais.endereco?.uf);
    function handleSubmitDados(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setFormValues({
            nome,
            telefone,
            cpf,
            endereco: {
                logradouro,
                bairro,
                numero,
                cidade,
                uf
            }
        })
        dispatch({
            type: FormActions.setDadosPessoais,
            payload: formValues
        })
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3} component="form" onChange={handleSubmitDados} >
                <Grid item xs={12}>
                    <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="telefone"
                        name="telefone"
                        label="Telefone/Whatsapp"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="endereco"
                        name="logradouro"
                        label="Endereço"
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cidade"
                        name="cidade"
                        label="Cidade"
                        fullWidth
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="uf"
                        name="uf"
                        label="Estado"
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="bairro"
                        name="bairro"
                        label="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="numero"
                        name="numero"
                        label="Numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment >
    );
}