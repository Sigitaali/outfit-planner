import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { outfitFormReducer, OutfitFormState } from '../reducer/creatOutfitReducer'
import { useNotification } from '../context/NotificationContext'

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
  const { user } = useAuth()
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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Outfit</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title:</label>
          <input
            value={formState.title}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label>Description:</label>
          <textarea
            value={formState.description}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label>Image URL:</label>
          <input
            value={formState.imageUrl}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'imageUrl', value: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label>Items:</label>
          <input
            value={formState.items}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'items', value: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label>Category:</label>
          <select
            value={formState.category}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </select>
        </div>

        <div className="form-control">
          <label>Subcategory:</label>
          <select
            value={formState.subcategory}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'subcategory', value: e.target.value })}
            required
          >
            <option value="">-- Select Subcategory --</option>
            {filteredSubcategories.map((sc) => (
              <option key={sc._id} value={sc._id}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Outfit</button>
      </form>
    </div>
  )
}

export default CreateOutfitPage
