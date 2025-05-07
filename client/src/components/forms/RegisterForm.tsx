import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper
} from '@mui/material'

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password
      })
      navigate('/login')
    } catch (err: any) {
      console.error('Registration failed:', err)
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Paper>
  )
}

export default RegisterForm
