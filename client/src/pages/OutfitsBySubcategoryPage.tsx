import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Outfit {
  _id: string
  title: string
  description: string
  imageUrl: string
  subcategory: {
    name: string
  }
}

const OutfitsBySubcategoryPage = () => {
  const { subcategoryId } = useParams()
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/outfits?subcategory=${subcategoryId}`
        )
        setOutfits(res.data)
      } catch (err) {
        console.error('Failed to fetch outfits:', err)
      }
    }

    fetchOutfits()
  }, [subcategoryId])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Outfits</h2>
      <div className="outfit-grid">
        {outfits.map((outfit) => (
          <div key={outfit._id} className="outfit-card">
            <img src={outfit.imageUrl} alt={outfit.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{outfit.title}</h3>
            <p>{outfit.description}</p>
            <p><strong>Subcategory:</strong> {outfit.subcategory?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OutfitsBySubcategoryPage
