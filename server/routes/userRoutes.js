import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import rolesMiddleware from '../middleware/rolesMiddleware.js'
import { deleteUser, getCurrentUser } from '../controllers/userController.js'
import { updateUser } from '../controllers/userController.js'

const router = express.Router()

router.delete('/:id', authMiddleware, rolesMiddleware('admin'), deleteUser)
router.get('/me', authMiddleware, getCurrentUser)
router.patch('/:id', authMiddleware, updateUser)

export default router
