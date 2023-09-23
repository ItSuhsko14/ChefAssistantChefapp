import * as React from 'react';
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { fetchAuth } from '../../redux/slices/auth.js'
import { Navigate } from 'react-router-dom'

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

export default function Login () {
  const dispatch = useDispatch();
  const { register, 
          handleSubmit, 
          formState: { errors }
  } = useForm({
    defaultValues: {
      /*userName: 'a777',*/
      email: 'a777@gmail.com',
      password: '777777'
    },
    mode: 'all'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('cant authorize')
      console.log('cant autorize');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else { console.log('Cant autorize');
  }
  
  }

if (window.localStorage.token) {
  console.log("You are alredy authorize");
  return <Navigate to="/" replace='true' />
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
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          
            <form onSubmit={handleSubmit(onSubmit)}>
          
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="email"
                type="email"
                id="email"
                autoComplete="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: 'input email'}) }
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
                {...register('password', {required: 'input password'}) }
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </form>
            
            <Typography align="right">
              <Link href="/registration" variant="body1">
                {"I don't have an account? Sign Up"}
              </Link>
            </Typography>
              
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
