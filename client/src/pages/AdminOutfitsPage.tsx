import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box
} from '@mui/material'
import '../styles/AdminOutfitsPage.scss'

interface Outfit {
  _id: string
  title: string
  description: string
  imageUrl: string
  subcategory?: {
    name: string
  }
  user: {
    username: string
  }
}

const AdminOutfitsPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllOutfits()
    }
  }, [user])

  const fetchAllOutfits = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/outfits')
      setOutfits(res.data)
    } catch (err) {
      console.error('Failed to load outfits', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this outfit?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/outfits/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchAllOutfits()
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Outfits (Admin)</Typography>

      <div className="admin-outfit-list">
        {outfits.map(outfit => (
          <Card key={outfit._id} className="admin-outfit-card">
            <CardMedia
              component="img"
              height="200"
              image={outfit.imageUrl}
              alt={outfit.title}
            />
            <CardContent>
              <Typography variant="h6">{outfit.title}</Typography>
              <Typography variant="body2" paragraph>{outfit.description}</Typography>
              <Typography variant="body2">
                By: <strong>{outfit.user.username}</strong>{' '}
                {outfit.subcategory?.name && <> | Subcategory: {outfit.subcategory.name}</>}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Button variant="contained" onClick={() => navigate(`/edit-outfit/${outfit._id}`)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(outfit._id)}>
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default AdminOutfitsPage
