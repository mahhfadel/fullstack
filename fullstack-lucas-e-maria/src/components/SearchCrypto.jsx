import React, { useRef } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Buscar Criptomoeda
        </Typography>
        <TextField
          label="Digite o nome (ex: bitcoin)"
          variant="outlined"
          inputRef={inputRef}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
    </Container>
  );
};

export default SearchCrypto;
