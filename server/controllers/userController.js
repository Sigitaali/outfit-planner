import User from '../models/User.js'

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isOwner = user._id.toString() === req.user.id
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You are not allowed to delete this user' })
    }

    await user.deleteOne()
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      if (!user) return res.status(404).json({ message: 'User not found' })
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  
  export const updateUser = async (req, res) => {
    try {
      const userId = req.params.id === 'me' || !req.params.id
        ? req.user.id
        : req.params.id
  
      console.log('UPDATE USER -> userId:', userId)
      console.log('REQ BODY:', req.body)
      console.log('REQ USER:', req.user)
  
      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ message: 'User not found' })
  
      const isOwner = user._id.toString() === String(req.user.id)
      const isAdmin = req.user.role === 'admin'
  
      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: 'You are not allowed to update this user' })
      }
  
      const updatedFields = {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
        new: true,
        runValidators: true,
      }).select('-password')
  
      res.status(200).json(updatedUser)
    } catch (err) {
      console.error('UPDATE USER ERROR:', err)
      res.status(500).json({ message: 'Internal server error', error: err.message })
    }
  }
  
  
  

  export const getMe = async (req, res) => {
    try {
      const user = req.user
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      })
    } catch (err) {
      res.status(500).json({ message: 'Failed to load user', error: err.message })
    }
  }
  