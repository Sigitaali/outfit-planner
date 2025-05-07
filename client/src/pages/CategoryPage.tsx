import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box
} from '@mui/material'
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
    <Container className="category-container" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {category?.toUpperCase()} Subcategories
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr'
          },
          gap: 4,
          mt: 2
        }}
      >
        {subcategories.map((sub) => (
          <Card
            key={sub._id}
            onClick={() => navigate(`/outfits/subcategory/${sub._id}`)}
            sx={{ cursor: 'pointer' }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={formatImagePath(sub.name)}
                alt={sub.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {sub.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

export default CategoryPage
