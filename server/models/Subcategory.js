import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['men', 'women'], required: true }
})

export default mongoose.model('Subcategory', subcategorySchema)
