import Subcategory from '../models/Subcategory.js'

export const createSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.create(req.body)
    res.status(201).json(subcategory)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name')
    res.status(200).json(subcategories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
