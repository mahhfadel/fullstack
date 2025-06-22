import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PasswordField from '../components/PasswordField';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

function Login() {
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

                        <PasswordField />

                        
                        <Button
                            variant="contained"
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
