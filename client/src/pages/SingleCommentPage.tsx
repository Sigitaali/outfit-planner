import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Comment {
  _id: string
  text: string
  rating: number
  user: { username: string }
  outfit: { title: string }
}

const SingleCommentPage = () => {
  const { id } = useParams()
  const [comment, setComment] = useState<Comment | null>(null)

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/single/${id}`)
        setComment(res.data)
      } catch (err) {
        console.error('Failed to load comment:', err)
      }
    }

    fetchComment()
  }, [id])

  if (!comment) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Comment Detail</h2>
      <p><strong>User:</strong> {comment.user.username}</p>
      <p><strong>Outfit:</strong> {comment.outfit.title}</p>
      <p><strong>Rating:</strong> {comment.rating}★</p>
      <p><strong>Comment:</strong> {comment.text}</p>
    </div>
  )
}

export default SingleCommentPage
