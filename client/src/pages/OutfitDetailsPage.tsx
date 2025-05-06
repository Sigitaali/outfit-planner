import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/outfits/${id}`)
        setOutfit(res.data)
      } catch (err) {
        console.error('Failed to load outfit details:', err)
      }
    }

    fetchOutfit()
  }, [id])

  if (!outfit) return <p>Loading outfit...</p>

  return (
    <div className="outfit-details">
      <h2>{outfit.title}</h2>
      <img src={outfit.imageUrl} alt={outfit.title} />
      <p>{outfit.description}</p>
      <p><strong>Subcategory:</strong> {outfit.subcategory.name}</p>
      <p><strong>Created by:</strong> {outfit.user.username}</p>
      <p><strong>Items:</strong> {outfit.items.join(', ')}</p>
    </div>
  )
}

export default OutfitDetailsPage
