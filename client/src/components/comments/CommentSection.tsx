import { useEffect, useState } from 'react'
import axios from 'axios'
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
  const [rating, setRating] = useState(0)

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(0)

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
    if (!text || rating === 0) return

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
    <div className="comment-section">
      <h3>Comments</h3>

      {comments.length === 0 && <p>No comments yet.</p>}

      {comments.map(comment => (
        <div key={comment._id} className="comment">
          {editingCommentId === comment._id ? (
            <>
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <div className="stars">
                {[1, 2, 3, 4, 5].map(num => (
                  <span
                    key={num}
                    style={{
                      cursor: 'pointer',
                      color: num <= editRating ? '#f39c12' : '#ccc',
                      fontSize: '1.5rem'
                    }}
                    onClick={() => setEditRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <p>
                <strong>{comment.user.username}</strong>: {comment.text}
              </p>
              <div className="rating">
                {'★'.repeat(comment.rating)}
                {'☆'.repeat(5 - comment.rating)}
              </div>
              {user && user.id === comment.user._id && (
                <>
                  <button onClick={() => handleDelete(comment._id)}>Delete</button>
                  <button onClick={() => startEdit(comment)}>Edit</button>
                </>
              )}
            </>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <label htmlFor="rating">Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                style={{
                  cursor: 'pointer',
                  color: num <= rating ? '#f39c12' : '#ccc',
                  fontSize: '1.5rem'
                }}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  )
}

export default CommentSection
