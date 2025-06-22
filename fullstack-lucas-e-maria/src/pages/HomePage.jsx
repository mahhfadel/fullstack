import React, { useRef, useState, useContext } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography, CircularProgress } from '@mui/material';
import SearchCryptoComponent from '../components/SearchCryptoComponent';
import { CryptoProvider } from '../contexts/SearchCryptoContext';

function Home() {
    return (
        <CryptoProvider>
            <SearchCryptoComponent />
        </CryptoProvider>
    );
}
export default Home;
