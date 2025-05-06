import Outfit from '../models/Outfit.js'

export const createOutfit = async (req, res) => {
  try {
    const { title, description, imageUrl, items, subcategory } = req.body

    const outfit = await Outfit.create({
      title,
      description,
      imageUrl,
      items,
      subcategory,
      user: req.user.id 
    })

    res.status(201).json(outfit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getOutfits = async (req, res) => {
  try {
    const outfits = await Outfit.find()
      .populate({
        path: 'subcategory',
        populate: { path: 'category', select: 'name' }
      })
      .populate({
        path: 'user',
        select: 'username'
      })

    res.status(200).json(outfits)
  } catch (err) {
    console.error('getOutfits ERROR:', err)
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
    const outfit = await Outfit.findById(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })

    const isOwner = outfit.user.toString() === req.user.id
    if (!isOwner) return res.status(403).json({ message: 'Not authorized to edit this outfit' })

    const updated = await Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


export const deleteOutfit = async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
    if (!outfit) return res.status(404).json({ message: 'Outfit not found' })

    const isOwner = outfit.user.toString() === req.user.id
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You are not allowed to delete this outfit' })
    }

    await outfit.deleteOne()
    res.status(200).json({ message: 'Outfit deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getUserOutfits = async (req, res) => {
  try {
    console.log('User from token:', req.user)
    const userId = req.user.id
    const outfits = await Outfit.find({ user: userId }).populate('subcategory', 'name')
    res.status(200).json(outfits)
  } catch (err) {
    console.error('getUserOutfits ERROR:', err)
    res.status(500).json({ error: err.message })
  }
}

