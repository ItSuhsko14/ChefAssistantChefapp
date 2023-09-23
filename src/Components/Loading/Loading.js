import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box component="span" sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: 400,
       }}>
          <CircularProgress />
    </Box>
  )
}
