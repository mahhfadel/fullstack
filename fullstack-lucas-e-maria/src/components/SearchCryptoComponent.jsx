import React, { useRef, useState, useContext } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { CryptoContext } from '../contexts/SearchCryptoContext';

const SearchCryptoComponent = () => {
  const inputRef = useRef();
  const [hasError, setHasError] = useState(false);
  const { fetchCrypto, cryptoData, loading, apiError } = useContext(CryptoContext);

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    if (!query) {
      setHasError(true);
      return;
    }

    setHasError(false);
    fetchCrypto(query);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0B0C10, #1F2235)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center" color='#E3E3FF' marginBottom='32px'>
          Crypto Coins Master
        </Typography>

        <Card sx={{ boxShadow: '0 0 12px rgba(255, 0, 170, 0.4)' }}>
          <CardContent sx={{ backgroundColor: '#1A1F2B' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Search Crypto"
                variant="outlined"
                inputRef={inputRef}
                fullWidth
                error={hasError}
                helperText={hasError ? "This field required" : ""}
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
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FF00AA',
                  '&:hover': { backgroundColor: '#ad0174' },
                }}
                onClick={handleSearch}
              >
                Search
              </Button>

            </Box>
          </CardContent>
        </Card>

        {cryptoData && (
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box
              sx={{
                backgroundColor: '#1F2235',
                boxShadow: '0 0 12px rgba(255, 0, 170, 0.4)',
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th, & td': {
                    border: '1px solid #9D00FF',
                    padding: '12px',
                    textAlign: 'center',
                    color: '#E3E3FF',
                  },
                  '& th': {
                    backgroundColor: '#0B0C10',
                    color: '#FF00AA',
                  },
                }}
              >
                <thead>
                  <tr>
                    <th>Crypto</th>
                    <th>Symbol</th>
                    <th>Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cryptoData.name}</td>
                    <td>{cryptoData.symbol.toUpperCase()}</td>
                    <td>${cryptoData.market_data.current_price.usd.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Box>
            </Box>
          </Container>
        )}
      </Container>
    </Box>
  );
};

export default SearchCryptoComponent;
