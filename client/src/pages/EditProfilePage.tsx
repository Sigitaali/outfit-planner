import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper
} from '@mui/material'

const EditProfilePage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUsername(res.data.username)
        setEmail(res.data.email)
      } catch (err) {
        console.error('Failed to load user:', err)
      }
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      await axios.patch(`http://localhost:3000/api/users/me`, {
        username,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate('/profile')
    } catch (err) {
      console.error('Update failed:', err)
      setError('Failed to update profile.')
    }
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Edit Profile
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

        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Paper>
  )
}

export default EditProfilePage
