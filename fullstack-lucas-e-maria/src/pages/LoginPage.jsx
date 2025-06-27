import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordField from '../components/PasswordField';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

function Login() {
    const emailRef = useRef();
    const senhaRef = useRef();
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const senha = senhaRef.current.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValido) {
            setErro('Digite um e-mail válido.');
            return;
        }


        try {
            const resposta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
            setErro(dados.message || 'Erro ao fazer login');
            return;
            }

            localStorage.setItem('token', dados.token); 
            navigate('/home ');
        } catch (err) {
            setErro('Erro ao conectar com o servidor.');
            console.error(err);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0B0C10, #1F2235)', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant="h2" component="h1" align="center" color='#E3E3FF' marginBottom='32px'>
                Login
            </Typography>

            <Card sx={{ boxShadow: '0 0 12px rgba(255, 0, 170, 0.4)', width: '50%'}}>
                <CardContent sx={{ backgroundColor: '#1A1F2B' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Login"
                            variant="outlined"
                            fullWidth
                            inputRef={emailRef}
                            sx={{
                            input: { color: '#E3E3FF' },
                            label: {
                                color: '#E3E3FF',
                                '&.Mui-focused': { color: '#E3E3FF' },
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#E3E3FF' },
                                '&:hover fieldset': { borderColor: '#E3E3FF' },
                                '&.Mui-focused fieldset': { borderColor: '#E3E3FF' },
                            },
                            }}
                        />

                        <PasswordField label="Senha" ref={senhaRef}/>

                        {erro && <Typography color="error">{erro}</Typography>}
                        
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            sx={{
                            backgroundColor: '#FF00AA',
                            '&:hover': { backgroundColor: '#ad0174' },
                            }}  
                        >
                            Login
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Typography sx={{ color: 'white' }}>
                                Não tem uma conta?{' '}
                                <Link
                                    to="/criar-conta"
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Crie aqui
                                </Link>
                            </Typography>
                        </Box>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
export default Login;
