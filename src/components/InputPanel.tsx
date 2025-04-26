// src/components/InputPanel.tsx
import React from 'react';
import { TextField, Box, Stack, Typography } from '@mui/material';

type Props = {
  totalWeight: string;
  totalBox: string;
  onChange: (field: 'totalWeight' | 'totalBox', value: string) => void;
};

const InputPanel: React.FC<Props> = ({ totalWeight, totalBox, onChange }) => {
  const handleNumberInput = (field: 'totalWeight' | 'totalBox', value: string) => {
    // Only allow positive numbers
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      onChange(field, value);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{mb: 5}}>
        Enter Details
      </Typography>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Total Weight (kg)"
          variant="outlined"
          value={totalWeight}
          onChange={(e) => handleNumberInput('totalWeight', e.target.value)}
          type="number"
          InputProps={{
            inputProps: { min: 0 }
          }}
        />
        <TextField
          fullWidth
          label="Total Boxes"
          variant="outlined"
          value={totalBox}
          onChange={(e) => handleNumberInput('totalBox', e.target.value)}
          type="number"
          InputProps={{
            inputProps: { min: 1 }
          }}
        />
      </Stack>
    </Box>
  );
};

export default InputPanel;
