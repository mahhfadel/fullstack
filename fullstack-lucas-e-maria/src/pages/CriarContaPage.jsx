import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordField from '../components/PasswordField';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:8000';

function Login() {
    const nomeRef = useRef();
    const emailRef = useRef();
    const senhaRef = useRef();
    const confirmSenhaRef = useRef();
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleCriarConta = async () => {
        const nome = nomeRef.current.value;
        const email = emailRef.current.value;
        const senha = senhaRef.current.value;
        const confirmSenha = confirmSenhaRef.current.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValido) {
            setErro('Digite um e-mail válido.');
            return;
        }

        if (!senha || senha.length < 6) {
            setErro('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        if (senha !== confirmSenha) {
            setErro('As senhas não coincidem. Verifique e tente novamente.');
            return;
        }


        try {
            const resposta = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
            setErro(dados.message || 'Erro ao criar conta');
            return;
            }

            navigate('/login ');
        } catch (err) {
            setErro('Erro ao conectar com o servidor.');
            console.error(err);
        }
    };


    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0B0C10, #1F2235)', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant="h2" component="h1" align="center" color='#E3E3FF' marginBottom='32px'>
                Criar conta
            </Typography>

            <Card sx={{ boxShadow: '0 0 12px rgba(255, 0, 170, 0.4)', width: '50%'}}>
                <CardContent sx={{ backgroundColor: '#1A1F2B' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            inputRef={nomeRef}
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

                        <TextField
                            label="Email"
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

                        <PasswordField label="Confirmar senha" ref={confirmSenhaRef}/>

                        {erro && <Typography color="error">{erro}</Typography>}

                        <Button
                            variant="contained"
                            onClick={handleCriarConta}
                            sx={{
                            backgroundColor: '#FF00AA',
                            '&:hover': { backgroundColor: '#ad0174' },
                            }}  
                        >
                            Criar conta
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Typography sx={{ color: 'white' }}>
                                Já tem uma conta?{' '}
                                <Link
                                to="/login"
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                }}
                                >
                                Entre aqui
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
