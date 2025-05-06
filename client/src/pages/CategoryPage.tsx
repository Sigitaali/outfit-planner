import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/CategoryPage.scss'

interface Subcategory {
  _id: string
  name: string
  description: string
  category: string
}

const CategoryPage = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/subcategories')
        const filtered = res.data.filter(
          (sc: Subcategory) => sc.category === category
        )
        setSubcategories(filtered)
      } catch (err) {
        console.error('Error loading subcategories', err)
      }
    }

    fetchData()
  }, [category])

  const formatImagePath = (name: string) => {
    return `/pictures/${name.toLowerCase().replace(/ /g, '-')}.jpg`
  }

  return (
    <div className="category-container">
      <h2>{category?.toUpperCase()} Subcategories</h2>
      <div className="subcategory-grid">
        {subcategories.map((sub) => (
          <div
            key={sub._id}
            className="subcategory-card"
            onClick={() => navigate(`/outfits/subcategory/${sub._id}`)}
          >
            <img
              src={formatImagePath(sub.name)}
              alt={sub.name}
              className="subcategory-image"
            />
            <h3>{sub.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
