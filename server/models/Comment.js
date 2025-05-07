import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  outfit: { type: mongoose.Schema.Types.ObjectId, ref: 'Outfit', required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)
