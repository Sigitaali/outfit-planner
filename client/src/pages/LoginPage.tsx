import { Container, Typography, Paper } from '@mui/material'
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  )
}

export default LoginPage

