import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Paper,
  Box
} from '@mui/material'
import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import { outfitFormReducer, OutfitFormState } from '../reducer/creatOutfitReducer'

interface Subcategory {
  _id: string
  name: string
  category: string
}

const initialFormState: OutfitFormState = {
  title: '',
  description: '',
  imageUrl: '',
  items: '',
  category: '',
  subcategory: ''
}

const CreateOutfitPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [formState, dispatch] = useReducer(outfitFormReducer, initialFormState)
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/subcategories')
        setSubcategories(res.data)
      } catch (error) {
        setErrorMessage('Failed to fetch subcategory data.')
      }
    }

    fetchSubcategories()
  }, [])

  const filteredSubcategories = subcategories.filter(
    (sc) => sc.category === formState.category
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    const token = localStorage.getItem('token')
    if (!token) return setErrorMessage('No authentication token found.')

    try {
      const outfitData = {
        title: formState.title,
        description: formState.description,
        imageUrl: formState.imageUrl,
        items: formState.items.split(',').map((item: string) => item.trim()),
        subcategory: formState.subcategory
      }

      await axios.post('http://localhost:3000/api/outfits', outfitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      showNotification('Outfit successfully created!', 'success')
      navigate('/my-outfits')
    } catch (error: any) {
      console.error('Failed to create outfit:', error)
      showNotification('Failed to create outfit', 'error')
      setErrorMessage(error.response?.data?.message || 'Unknown error')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create New Outfit
        </Typography>

        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={formState.title}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })}
            required
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={formState.description}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
            required
          />

          <TextField
            label="Image URL"
            value={formState.imageUrl}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'imageUrl', value: e.target.value })}
            required
          />

          <TextField
            label="Items (comma-separated)"
            value={formState.items}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'items', value: e.target.value })}
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formState.category}
              label="Category"
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })}
            >
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="men">Men</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={formState.subcategory}
              label="Subcategory"
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'subcategory', value: e.target.value })}
            >
              {filteredSubcategories.map((sc) => (
                <MenuItem key={sc._id} value={sc._id}>
                  {sc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Create Outfit
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreateOutfitPage
