import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  if (loading) return <p>Loading comments...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (comments.length === 0) return <p>No comments available.</p>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>All Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment._id}
          onClick={() => navigate(`/comments/${comment._id}`)}
          style={{
            border: '1px solid #ccc',
            padding: '12px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px'
          }}
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
