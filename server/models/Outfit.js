import mongoose from 'mongoose'

const outfitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  items: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true }
}, { timestamps: true })

export default mongoose.model('Outfit', outfitSchema)
