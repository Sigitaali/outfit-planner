import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box
} from '@mui/material'

interface User {
  _id: string
  username: string
  email: string
  role: 'user' | 'admin'
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data)
    } catch (err) {
      console.error('Failed to load users', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchUsers()
    } catch (err) {
      console.error('Failed to delete user', err)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Users (Admin)</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {users.map(user => (
          <Card key={user._id}>
            <CardContent>
              <Typography variant="h6">{user.username}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Role: {user.role}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

export default AdminUsersPage
