import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const fetchCrypto = async (query) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${query.toLowerCase()}`);
      setCryptoData(response.data);
    } catch (error) {
      setApiError("Criptomoeda não encontrada.");
      setCryptoData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CryptoContext.Provider value={{ cryptoData, fetchCrypto, loading, apiError }}>
      {children}
    </CryptoContext.Provider>
  );
};
