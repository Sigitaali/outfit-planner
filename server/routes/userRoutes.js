import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import rolesMiddleware from '../middleware/rolesMiddleware.js'
import {
  getCurrentUser,
  getMe,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import User from '../models/User.js' // 👈 PRIDĖTA

const router = express.Router()

router.get('/', authMiddleware, rolesMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.delete('/:id', authMiddleware, rolesMiddleware('admin'), deleteUser)
router.get('/me', authMiddleware, getCurrentUser)
router.patch('/:id', authMiddleware, updateUser)
router.patch('/me', authMiddleware, updateUser)

export default router
