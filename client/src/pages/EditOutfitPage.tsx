import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

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

      await axios.put(
        `http://localhost:3000/api/outfits/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      navigate('/my-outfits')
    } catch (err: any) {
      console.error('Failed to update outfit', err)
      setError(err.response?.data?.message || 'Failed to update outfit.')
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Outfit</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-control">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-control">
          <label>Image URL:</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>

        <div className="form-control">
          <label>Items (comma separated):</label>
          <input value={items} onChange={(e) => setItems(e.target.value)} required />
        </div>

        <div className="form-control">
          <label>Subcategory:</label>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
            <option value="">-- Select --</option>
            {subcategories.map((sc) => (
              <option key={sc._id} value={sc._id}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update Outfit</button>
      </form>
    </div>
  )
}

export default EditOutfitPage
