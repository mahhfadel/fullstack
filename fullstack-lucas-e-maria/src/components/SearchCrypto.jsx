import React, { useRef } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

const SearchCrypto = () => {
  const inputRef = useRef();

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    if (!query) {
      alert('Por favor, digite o nome de uma criptomoeda.');
      return;
    }

    console.log('Criptomoeda digitada:', query);
    // Aqui depois vamos fazer a chamada para a API da CoinGecko com esse valor
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fdec6f', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Card elevation={4}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" component="h1" align="center">
                Buscar Criptomoeda
              </Typography>
              <TextField
                label="Digite o nome (ex: bitcoin)"
                variant="outlined"
                inputRef={inputRef}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ //sx permite que estilize um componente do MUI usando uma sintaxe de objeto JavaScript
                    backgroundColor: '#1f0b0c',
                    '&:hover': {
                    backgroundColor: '#361f2d',
                    },
                }}
                onClick={handleSearch}
                >
                Buscar
                </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SearchCrypto;
