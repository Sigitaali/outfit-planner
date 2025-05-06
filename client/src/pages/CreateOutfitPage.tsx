import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Subcategory {
  _id: string
  name: string
  category: string
}

const CreateOutfitPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [items, setItems] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/subcategories')
        setSubcategories(res.data)
      } catch (error) {
        console.error('Failed to fetch subcategories:', error)
        setErrorMessage('Failed to fetch subcategory data.')
      }
    }

    fetchSubcategories()
  }, [])

  const filteredSubcategories = subcategories.filter(
    (sc) => sc.category === category
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    const token = localStorage.getItem('token')

    if (!token) {
      setErrorMessage('No authentication token found.')
      return
    }

    try {
      const outfitData = {
        title,
        description,
        imageUrl,
        items: items.split(',').map((item) => item.trim()),
        subcategory,
      }

      const response = await axios.post(
        'http://localhost:3000/api/outfits',
        outfitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Outfit created successfully:', response.data)
      navigate('/my-outfits')
    } catch (error: any) {
      console.error('Failed to create outfit:', error)
      if (error.response) {
        setErrorMessage(
          `Server error: ${error.response.status} - ${
            error.response.data.message || 'Unknown error'
          }`
        )
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your network.')
      } else {
        setErrorMessage(`Error: ${error.message}`)
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Outfit</h2>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '1em' }}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Image URL:</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Items (e.g. jacket, boots):</label>
          <input
            value={items}
            onChange={(e) => setItems(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
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
