import Outfit from '../models/Outfit.js'

export const createOutfit = async (req, res) => {
  try {
    const outfit = await Outfit.create(req.body)
    res.status(201).json(outfit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getOutfits = async (req, res) => {
  try {
    const outfits = await Outfit.find()
      .populate('user', 'username')
      .populate('subcategory', 'name')
    res.status(200).json(outfits)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getOutfitById = async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
      .populate('user', 'username')
      .populate('subcategory', 'name')
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })
    res.status(200).json(outfit)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateOutfit = async (req, res) => {
  try {
    const updated = await Outfit.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updated) return res.status(404).json({ message: 'Outfit not found' })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteOutfit = async (req, res) => {
  try {
    const deleted = await Outfit.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Outfit not found' })
    res.status(200).json({ message: 'Outfit deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
