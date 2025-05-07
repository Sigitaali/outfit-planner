import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  TextField,
  Rating,
  Button,
  Paper,
  Stack
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'

interface Comment {
  _id: string
  text: string
  rating: number
  user: {
    _id: string
    username: string
  }
}

interface Props {
  outfitId: string
}

const CommentSection = ({ outfitId }: Props) => {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState<number | null>(0)

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState<number | null>(0)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/${outfitId}`)
        setComments(res.data)
      } catch (err) {
        console.error('Failed to load comments:', err)
      }
    }

    fetchComments()
  }, [outfitId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text || !rating) return

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:3000/api/comments',
        { text, outfit: outfitId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setComments(prev => [...prev, res.data])
      setText('')
      setRating(0)
    } catch (err) {
      console.error('Failed to leave comment:', err)
    }
  }

  const handleDelete = async (commentId: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComments(prev => prev.filter(c => c._id !== commentId))
    } catch (err) {
      console.error('Failed to delete comment:', err)
    }
  }

  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment._id)
    setEditText(comment.text)
    setEditRating(comment.rating)
  }

  const cancelEdit = () => {
    setEditingCommentId(null)
    setEditText('')
    setEditRating(0)
  }

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(
        `http://localhost:3000/api/comments/${editingCommentId}`,
        { text: editText, rating: editRating },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setComments(prev =>
        prev.map(c => (c._id === editingCommentId ? res.data : c))
      )

      cancelEdit()
    } catch (err) {
      console.error('Failed to update comment:', err)
    }
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Comments</Typography>

      {comments.length === 0 && <Typography>No comments yet.</Typography>}

      <Stack spacing={2}>
        {comments.map(comment => (
          <Paper key={comment._id} elevation={3} sx={{ p: 2 }}>
            {editingCommentId === comment._id ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  label="Edit Comment"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Rating
                  value={editRating}
                  onChange={(_, newValue) => setEditRating(newValue)}
                />
                <Box mt={1}>
                  <Button onClick={saveEdit} variant="contained" size="small" sx={{ mr: 1 }}>Save</Button>
                  <Button onClick={cancelEdit} variant="outlined" size="small" color="secondary">Cancel</Button>
                </Box>
              </>
            ) : (
              <>
                <Typography>
                  <strong>{comment.user.username}</strong>: {comment.text}
                </Typography>
                <Rating value={comment.rating} readOnly />
                {user && user.id === comment.user._id && (
                  <Box mt={1}>
                    <Button onClick={() => startEdit(comment)} size="small">Edit</Button>
                    <Button onClick={() => handleDelete(comment._id)} size="small" color="error">Delete</Button>
                  </Box>
                )}
              </>
            )}
          </Paper>
        ))}
      </Stack>

      {user && (
        <Box component="form" onSubmit={handleSubmit} mt={4}>
          <Typography variant="h6">Leave a comment</Typography>
          <TextField
            fullWidth
            label="Your comment"
            multiline
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">Post Comment</Button>
        </Box>
      )}
    </Box>
  )
}

export default CommentSection
