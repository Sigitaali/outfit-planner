import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import {
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'

const LoginForm: React.FC = () => {
  const { loginUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      })
      loginUser(res.data.token)
      navigate('/profile')
    } catch (err: any) {
      console.error('Login failed:', err)
      setError('Invalid email or password.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  )
}

export default LoginForm
