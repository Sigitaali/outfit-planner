import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import { useAuth } from '../context/AuthContext'

interface Comment {
  _id: string
  text: string
  rating: number
  user: { username: string }
  outfit: { title: string }
}

const AdminCommentsPage = () => {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(0)

  useEffect(() => {
    if (user?.role !== 'admin') return
    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/comments')
        setComments(res.data)
      } catch (err) {
        console.error('Failed to fetch comments', err)
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [user])

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComments(prev => prev.filter(c => c._id !== id))
    } catch (err) {
      console.error('Failed to delete comment', err)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:3000/api/comments/${editingId}`,
        { text: editText, rating: editRating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setComments(prev =>
        prev.map(c => c._id === editingId ? { ...c, text: editText, rating: editRating } : c)
      )
      setEditingId(null)
    } catch (err) {
      console.error('Failed to update comment', err)
    }
  }

  if (user?.role !== 'admin') {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>Access denied.</Typography>
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Comments</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        comments.map(comment => (
          <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
            <Typography><strong>User:</strong> {comment.user.username}</Typography>
            <Typography><strong>Outfit:</strong> {comment.outfit.title}</Typography>
            {editingId === comment._id ? (
              <>
                <TextField
                  label="Text"
                  fullWidth
                  multiline
                  sx={{ mt: 2 }}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <TextField
                  label="Rating"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  sx={{ mt: 2 }}
                  value={editRating}
                  onChange={e => setEditRating(parseInt(e.target.value))}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                </Box>
              </>
            ) : (
              <>
                <Typography><strong>Rating:</strong> {comment.rating}</Typography>
                <Typography><strong>Text:</strong> {comment.text}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button variant="outlined" onClick={() => {
                    setEditingId(comment._id)
                    setEditText(comment.text)
                    setEditRating(comment.rating)
                  }}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(comment._id)}>Delete</Button>
                </Box>
              </>
            )}
          </Paper>
        ))
      )}
    </Container>
  )
}

export default AdminCommentsPage
