import React from 'react';
import { Box, Typography, Paper, Divider, Fade, Tooltip } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

type Props = {
  totalWeight: string;
  totalBox: string;
};

const OutputPanel: React.FC<Props> = ({ totalWeight, totalBox }) => {
  const weight = parseFloat(totalWeight);
  const boxes = parseInt(totalBox, 10);

  if (isNaN(weight) || isNaN(boxes) || boxes <= 0 || weight <= 0) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          Please enter valid values for Total Weight and Total Boxes.
        </Typography>
      </Box>
    );
  }

  // Calculate equal weight per box (with decimals)
  const weightPerBox = (weight / boxes).toFixed(2); // Decimal value for equal distribution

  // Calculate the remainder weight (no decimals)
  const weightPerBoxInt = Math.floor(weight / boxes); // Integer value for equal distribution
  const remainderWeight = weight % boxes;
  
  // Calculate higher weight distribution per box
  const higherWeightPerBox = Math.ceil(weight / boxes);
  const lowRemainderBox = weight - (higherWeightPerBox * (boxes - 1));

  // Check if low remainder distribution is valid
  const isLowRemainderValid = lowRemainderBox > 0;

  return (
    <Box>
      <Fade in timeout={800}>
        <Box>
          <Typography variant="h6" sx={{ 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'primary.main' 
          }}>
            <BalanceIcon /> Calculated Distribution:
          </Typography>
          
          {[
            {
              icon: <BalanceIcon />,
              title: "1. Equal Distribution",
              content: `${weightPerBox} kg per box`,
              tooltip: "Each box gets exactly the same weight"
            },
            {
              icon: <TrendingUpIcon />,
              title: "2. High Remainder Distribution",
              content: `${boxes - 1} boxes with ${weightPerBoxInt} kg, and 1 box with ${weightPerBoxInt + remainderWeight} kg`,
              tooltip: "One box gets the remainder weight added to it"
            },
            {
              icon: <TrendingDownIcon />,
              title: "3. Low Remainder Distribution",
              content: isLowRemainderValid 
                ? `${boxes - 1} boxes with ${higherWeightPerBox} kg, and 1 box with ${lowRemainderBox} kg`
                : "Low remainder distribution not possible",
              tooltip: "One box gets less weight than others"
            }
          ].map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider sx={{ my: 2 }} />}
              <Tooltip title={item.tooltip}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    mb: index < 2 ? 2 : 0,
                    '&:hover': { 
                      boxShadow: 3,
                      transform: 'scale(1.01)',
                      transition: 'all 0.3s ease-in-out'
                    } 
                  }}
                >
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    <strong>{item.title}:</strong>
                  </Typography>
                  <Typography sx={{ pl: 4, mt: 1 }}>
                    {item.content}
                  </Typography>
                </Paper>
              </Tooltip>
            </React.Fragment>
          ))}
        </Box>
      </Fade>
    </Box>
  );
};

export default OutputPanel;
