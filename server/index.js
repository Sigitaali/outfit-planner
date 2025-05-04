import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import outfitRoutes from './routes/outfitRoutes.js'
import subcategoryRoutes from './routes/subcategoryRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'




dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/outfits', outfitRoutes)

app.use('/api/subcategories', subcategoryRoutes)

app.use('/api/categories', categoryRoutes)



app.get('/', (req, res) => {
  res.send('Outfit Planner API is running')
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Database connection error:', err.message)
  })
