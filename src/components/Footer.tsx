import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(1),
            textAlign: 'center'
        })}>
            <Typography>© Prit Mokariya. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;