import React from 'react'
import { Container, Button } from '@mui/material/'

export default function Navbar () {
  return (
    <Container maxWidth='lg'>
      <Button sx={{
                width: '140px', 
                height: '40px', 
                background:'red', 
                color:'black'}}>
        Button
      </Button>
    </Container>
    )
}