import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label="Senha"
      type={showPassword ? 'text' : 'password'}
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePassword}
              edge="end"
              sx={{ color: '#E3E3FF' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
