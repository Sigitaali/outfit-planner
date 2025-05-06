import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../components/buttons/SubmitButton'
import DangerButton from '../components/buttons/DangerButton'

interface Outfit {
  _id: string
  title: string
  description: string
  imageUrl: string
  subcategory: {
    name: string
  }
}

const MyOutfitsPage = () => {
  const { user } = useAuth()
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyOutfits()
  }, [])

  const fetchMyOutfits = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:3000/api/outfits/mine', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOutfits(res.data)
    } catch (err) {
      console.error('Failed to load outfits', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this outfit?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/outfits/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMyOutfits()
    } catch (err) {
      console.error('Failed to delete outfit', err)
    }
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-outfit/${id}`)
  }

  return (
    <div className="my-outfits">
      <h2>My Outfits</h2>
      {outfits.length === 0 ? (
        <p>You haven't created any outfits yet.</p>
      ) : (
        <div className="outfit-grid">
          {outfits.map((outfit) => (
            <div key={outfit._id} className="outfit-card">
              <img src={outfit.imageUrl} alt={outfit.title} />
              <h3>{outfit.title}</h3>
              <p>{outfit.description}</p>
              <p><strong>Category:</strong> {outfit.subcategory?.name}</p>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <SubmitButton text="Edit" onClick={() => handleEdit(outfit._id)} color="primary" />
                <DangerButton onClick={() => handleDelete(outfit._id)}>Delete</DangerButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOutfitsPage
