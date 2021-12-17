import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../../contexts/AuthContext';
import { Copyright } from '../../components/Copyright'
import { Alert, CircularProgress } from '@mui/material';

export const Login = () => {
    const { signIn } = useAuth()
    const navigator = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault()
        const data = new FormData(evt.currentTarget);
        console.log(data.get('email'), data.get('password'))
        setLoading(true)

        signIn({ email, password })
            .then(res => {
                navigator('app/home')
            })
            .catch(err => setError(true))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type='password'
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Acessar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {loading ? <CircularProgress size={20} sx={{ color: "secondary.main" }} /> : null}
                            {error && <Alert severity='error'>{"Erro de autenticação"}</Alert>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}