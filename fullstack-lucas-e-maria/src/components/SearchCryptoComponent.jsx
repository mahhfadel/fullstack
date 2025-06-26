import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CryptoContext } from '../contexts/SearchCryptoContext';

const SearchCryptoComponent = () => {
  const inputRef = useRef();
  const [hasError, setHasError] = useState(false);
  const { fetchCrypto, cryptoData, loading, apiError } = useContext(CryptoContext);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    if (!query) {
      setHasError(true);
      return;
    }
    setHasError(false);
    fetchCrypto(query);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  useEffect(() => {
    if (cryptoData) {
      const newEntry = {
        name: cryptoData.name,
        symbol: cryptoData.symbol.toUpperCase(),
        price: cryptoData.market_data.current_price.usd,
      };

      // Evita duplicatas
      setSearchHistory((prev) => {
        const exists = prev.some((item) => item.name === newEntry.name);
        return exists ? prev : [...prev, newEntry];
      });
    }
  }, [cryptoData]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0B0C10, #1F2235)',
        display: 'flex',
        alignItems: 'center',
        paddingY: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center" color="#E3E3FF" marginBottom="32px">
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
                helperText={hasError ? 'This field is required' : ''}
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

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress sx={{ color: '#FF00AA' }} />
                </Box>
              )}

              {apiError && (
                <Typography color="error" align="center">
                  {apiError}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Resultado atual */}
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

        {/* Histórico de buscas */}
        {searchHistory.length > 0 && (
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h6" color="#E3E3FF" gutterBottom>
              Histórico de Buscas
            </Typography>
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                '& th, & td': {
                  border: '1px solid #9D00FF',
                  padding: '8px',
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
                {searchHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>${item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: '#FF00AA',
                color: '#FF00AA',
                '&:hover': {
                  backgroundColor: '#FF00AA',
                  color: '#fff',
                },
              }}
              onClick={handleClearHistory}
            >
              Limpar histórico
            </Button>
          </Container>
        )}
      </Container>
    </Box>
  );
};

export default SearchCryptoComponent;
