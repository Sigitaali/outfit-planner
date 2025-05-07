import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress
} from '@mui/material'

interface Comment {
  _id: string
  text: string
  rating: number
  user: {
    _id: string
    username: string
  }
  outfit: {
    _id: string
    title: string
  }
}

const SingleCommentPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [comment, setComment] = useState<Comment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/single/${id}`)
        setComment(res.data)
      } catch (err) {
        console.error('Failed to load comment:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComment()
  }, [id])

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this comment?')
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/comments/${comment?._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Comment deleted successfully.')
      navigate('/comments')
    } catch (err) {
      console.error('Failed to delete comment:', err)
    }
  }

  const handleEdit = () => {
    alert('Edit functionality is not yet implemented.')
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    )
  }

  if (!comment) return <Typography align="center">Comment not found.</Typography>

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Comment Details</Typography>

        <Typography><strong>User:</strong> {comment.user.username}</Typography>

        <Typography>
          <strong>Outfit:</strong>{' '}
          <Link to={`/outfits/details/${comment.outfit._id}`}>
            {comment.outfit.title}
          </Link>
        </Typography>

        <Typography><strong>Rating:</strong> {comment.rating}★</Typography>
        <Typography sx={{ mb: 2 }}><strong>Comment:</strong> {comment.text}</Typography>

        {user && user.id === comment.user._id && (
          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default SingleCommentPage
