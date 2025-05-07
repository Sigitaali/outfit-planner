import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/OutfitsBySubcategoryPage.scss'

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
  const navigate = useNavigate()
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
    <div className="subcategory-outfits">
      <h2>Outfits</h2>
      {outfits.length === 0 ? (
        <p>No outfits available in this subcategory.</p>
      ) : (
        <div className="outfit-grid">
          {outfits.map((outfit) => (
            <div
              key={outfit._id}
              className="outfit-card"
              onClick={() => navigate(`/outfits/details/${outfit._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={outfit.imageUrl} alt={outfit.title} />
              <h3>{outfit.title}</h3>
              <p>{outfit.description}</p>
              <p><strong>Subcategory:</strong> {outfit.subcategory?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OutfitsBySubcategoryPage
