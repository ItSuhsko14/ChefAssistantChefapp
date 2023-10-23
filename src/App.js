
import React from 'react'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Container from "@mui/material/Container";
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth.js'
import { router } from './router/router.js'
import requestWakeLock from './utils/wakeLock'

function App() {
  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(fetchAuthMe())
    requestWakeLock(); // for wake up screen
  }, [])

  console.log(navigator.wakeLock)
  
  return (
    <>
      <Container maxWidth='lg'>
        
          <RouterProvider router={router} />
        
      </Container>   
    </> 
    )
  }

export default App;
