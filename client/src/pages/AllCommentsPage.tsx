import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/AllCommentsPage.scss'

interface Comment {
  _id: string
  text: string
  rating: number
  user?: { username: string }
  outfit?: { title: string }
}

const AllCommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/comments')
        setComments(res.data)
      } catch (err) {
        console.error('Failed to load comments:', err)
        setError('Could not fetch comments.')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  if (loading) return <p style={{ textAlign: 'center' }}>Loading comments...</p>
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
  if (comments.length === 0) return <p style={{ textAlign: 'center' }}>No comments available.</p>

  return (
    <div className="comments-container">
      <h2>All Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="comment-card"
          onClick={() => navigate(`/comments/${comment._id}`)}
        >
          <p>
            <strong>{comment.user?.username || 'Unknown user'}</strong> on{' '}
            <em>{comment.outfit?.title || 'Deleted outfit'}</em>
          </p>
          <p>{comment.text}</p>
          <p>Rating: {comment.rating}★</p>
        </div>
      ))}
    </div>
  )
}

export default AllCommentsPage
