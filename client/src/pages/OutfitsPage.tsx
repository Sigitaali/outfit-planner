import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface Outfit {
  _id: string
  title: string
  description: string
  imageUrl: string
  subcategory: {
    name: string
    category?: string
  }
  user?: {
    username: string
  }
}

const OutfitsPage = () => {
  const { category } = useParams()
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/outfits')
        const filtered = res.data.filter(
          (outfit: any) => outfit.subcategory?.category?.name === category
        )

        setOutfits(filtered)
      } catch (err) {
        console.error('Error loading outfits', err)
      }
    }

    fetchOutfits()
  }, [category])

  return (
    <div className="outfit-list">
      <h2>{category?.toUpperCase()} Outfit Ideas</h2>
      <div className="outfit-grid">
        {outfits.map(outfit => (
          <div key={outfit._id} className="outfit-card">
            <img src={outfit.imageUrl} alt={outfit.title} />
            <h3>{outfit.title}</h3>
            <p>{outfit.description}</p>
            <p><strong>Created by:</strong> {outfit.user?.username}</p>
            <Link to={`/outfits/details/${outfit._id}`}>View this outfit details</Link>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OutfitsPage
