import React, { useRef, useState } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

const SearchCrypto = () => {
  const inputRef = useRef();
  const [hasError, setHasError] = useState(false);  

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    if (!query) {
      setHasError(true); 
      return;
    }

    setHasError(false); 
    alert('Pesquisa realizada!');
    console.log('Criptomoeda digitada:', query);
    // Aqui depois vamos fazer a chamada para a API da CoinGecko com esse valor
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0B0C10, #1F2235)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center" color='#E3E3FF' marginBottom='32px'>
          Cripto Coins Master
        </Typography>

        <Card sx={{boxShadow: '0 0 12px #9D00FF'}}>
          <CardContent sx={{backgroundColor: '#1A1F2B'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Buscar criptmoedas"
                variant="outlined"
                inputRef={inputRef}
                fullWidth
                error={hasError} 
                helperText={hasError ? "Este campo é obrigatório" : ""}  
                sx={{
                  input: { color: '#E3E3FF' },
                  label: {
                    color: '#E3E3FF',
                    '&.Mui-focused': {
                      color: '#E3E3FF', 
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E3E3FF',
                    },
                    '&:hover fieldset': {
                      borderColor: '#E3E3FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E3E3FF',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{ 
                  backgroundColor: '#9D00FF',
                  '&:hover': {
                    backgroundColor: '#7F00FF',
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
