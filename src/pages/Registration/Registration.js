import * as React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/slices/register.js'



function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Chef assistant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp () {
  const dispatch = useDispatch();
  const { register,
          handleSubmit,
          formState: {errors}
        } = useForm({
          defaultValues: {
            userName: 'a888',
            email: 'a888@gmail.com',
            password: '888888'
          },
          mode: 'all'
        })

const onSubmit = async (values) => {
  const data = await dispatch(fetchRegister(values));

  if (!data.payload) {
    return alert('cant register')
  }
  if ('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token)
  } else { console.log('cant register'); }
}

if (window.localStorage.token) {
  return <Navigate to='/' />
}
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              name="userName"
              autoComplete="userName"
              error={Boolean(errors.userName?.message)}
              helperText={errors.userName?.message}
              {...register('userName', {required: 'input userName'})}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              id="password"
              autoComplete="email"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', {required: 'input email'})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {required: 'input password'})}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
            <Typography align="right">
              <Link href="login" variant="body1">
                {"Alredy have an account? Sign In"}
              </Link>
            </Typography>
              
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
