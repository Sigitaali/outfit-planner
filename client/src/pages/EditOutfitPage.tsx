import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Box
} from '@mui/material'

interface Subcategory {
  _id: string
  name: string
  category: string
}

const EditOutfitPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [items, setItems] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOutfit()
    fetchSubcategories()
  }, [])

  const fetchOutfit = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/outfits/${id}`)
      const outfit = res.data
      setTitle(outfit.title)
      setDescription(outfit.description)
      setImageUrl(outfit.imageUrl)
      setItems(outfit.items.join(', '))
      setSubcategory(outfit.subcategory?._id || '')
    } catch (err) {
      console.error('Failed to load outfit', err)
    }
  }

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/subcategories')
      setSubcategories(res.data)
    } catch (err) {
      console.error('Failed to load subcategories', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const token = localStorage.getItem('token')
    if (!token) {
      setError('Authorization token not found.')
      return
    }

    try {
      const updatedData = {
        title,
        description,
        imageUrl,
        items: items.split(',').map((item: string) => item.trim()),
        subcategory
      }

      await axios.put(`http://localhost:3000/api/outfits/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      navigate('/my-outfits')
    } catch (err: any) {
      console.error('Failed to update outfit', err)
      setError(err.response?.data?.message || 'Failed to update outfit.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Outfit
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <TextField
            label="Items (comma separated)"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={subcategory}
              label="Subcategory"
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <MenuItem value="">-- Select --</MenuItem>
              {subcategories.map((sc) => (
                <MenuItem key={sc._id} value={sc._id}>
                  {sc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Update Outfit
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default EditOutfitPage
