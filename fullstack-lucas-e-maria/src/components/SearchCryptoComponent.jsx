import React, { useRef, useState, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom'
import { CryptoContext } from '../contexts/SearchCryptoContext'

const SearchCryptoComponent = () => {
  const inputRef = useRef()
  const [hasError, setHasError] = useState(false)
  const [erro, setErro] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { fetchCrypto, cryptoData, loading, apiError } = useContext(CryptoContext)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const fetchSearchHistory = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/search-history?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar histórico.');

      const data = await response.json();
      setSearchHistory(data.resultado); // array de buscas
      setTotalPages(data.totalPaginas); // ou calcule baseado em data.total
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
      setHasError('Erro ao carregar histórico.');
    }
  };

  useEffect(() => {
    fetchSearchHistory(1);
  }, []);

  const handleSearch = async () => {
    const query = inputRef.current.value.trim()
    if (!query) {
      setHasError(true)
      return
    }
    setHasError(false)
    await fetchCrypto(query)

    try {
      if (!cryptoData?.name) return

      const resposta = await fetch('/search-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cryptoName: cryptoData.name,
          symbol: cryptoData.symbol.toUpperCase(),
          price: cryptoData.market_data.current_price.usd.toString(),
        }),
      })

      if (!resposta.ok) {
        const dados = await resposta.json()
        throw new Error(dados.message || 'Erro ao salvar busca')
      }

      fetchSearchHistory()
    } catch (err) {
      console.error(err)
      setErro('Erro ao salvar no histórico')
    }
  }

  const handleClearHistory = async () => {
    try {
      const resposta = await fetch('/search-history', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!resposta.ok) throw new Error('Erro ao limpar histórico')

      setSearchHistory([])
    } catch (err) {
      console.error(err)
      setErro('Erro ao limpar histórico')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

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
        <IconButton
          onClick={handleLogout}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 9999,
            backgroundColor: 'transparent',
            color: 'white',
            '&:hover': {
              backgroundColor: 'transparent',
              opacity: 0.8,
            },
          }}
        >
          <LogoutIcon fontSize="large" />
        </IconButton>

        <Typography variant="h2" align="center" color="#E3E3FF" mb={4}>
          Crypto Coins Master
        </Typography>

        <Card sx={{ boxShadow: '0 0 12px rgba(255, 0, 170, 0.4)' }}>
          <CardContent sx={{ backgroundColor: '#1A1F2B' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Buscar Crypto"
                variant="outlined"
                inputRef={inputRef}
                fullWidth
                error={hasError}
                helperText={hasError ? 'Campo obrigatório' : ''}
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
                Pesquisar
              </Button>

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress sx={{ color: '#FF00AA' }} />
                </Box>
              )}

              {erro && (
                <Typography color="error" align="center">
                  {erro}
                </Typography>
              )}
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

        {searchHistory.length > 0 && (
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h6" color="#E3E3FF" align='center' gutterBottom>
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
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {searchHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.cryptoName}</td>
                    <td>{item.symbol}</td>
                    <td>${parseFloat(item.price).toLocaleString()}</td>
                    <td>{new Date(item.searchedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" gap="12" mt={2}>

              <IconButton
                variant="outlined"
                disabled={currentPage === 1}
                onClick={() => fetchSearchHistory(currentPage - 1)}
                sx={{
                  borderColor: '#FF00AA',
                  color: '#FF00AA',
                  '&:hover': { color: 'white' },
                }}
              >
                <ArrowBackIosIcon fontSize="large" />
              </IconButton>

              <Typography color="#E3E3FF" align="center" sx={{ pt: 1 }}>
                Página {currentPage} de {totalPages}
              </Typography>

              <IconButton
                variant="outlined"
                disabled={currentPage === totalPages}
                onClick={() => fetchSearchHistory(currentPage + 1)}
                sx={{
                  borderColor: '#FF00AA',
                  color: '#FF00AA',
                  '&:hover': { color: 'white' },
                }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
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
  )
}

export default SearchCryptoComponent
