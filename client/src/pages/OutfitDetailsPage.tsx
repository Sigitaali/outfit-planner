import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Chip,
    Box
  } from '@mui/material'
import CommentSection from '../components/comments/CommentSection'
import '../styles/OutfitDetailsPage.scss'


interface Outfit {
  _id: string
  title: string
  description: string
  imageUrl: string
  items: string[]
  user: { username: string }
  subcategory: { name: string }
}

const OutfitDetailsPage = () => {
  const { id } = useParams()
  const [outfit, setOutfit] = useState<Outfit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/outfits/${id}`)
        setOutfit(res.data)
      } catch (err) {
        console.error('Failed to load outfit details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOutfit()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    )
  }

  if (!outfit) return <Typography textAlign="center">Outfit not found.</Typography>

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card className="outfit-card">
        <CardMedia
          component="img"
          image={outfit.imageUrl}
          alt={outfit.title}
          className="outfit-image"
        />
  
        <CardContent>
          <Typography variant="h5" gutterBottom>{outfit.title}</Typography>
          <Typography variant="body1" paragraph>{outfit.description}</Typography>

          <Box mb={1}>
            <Chip label={`Subcategory: ${outfit.subcategory.name}`} sx={{ mr: 1 }} />
            <Chip label={`Created by: ${outfit.user.username}`} />
          </Box>

          <Typography variant="body2">
            <strong>Items:</strong> {outfit.items.join(', ')}
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4}>
        <CommentSection outfitId={outfit._id} />
      </Box>
    </Container>
  )
}

export default OutfitDetailsPage
