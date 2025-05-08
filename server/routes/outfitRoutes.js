import express from 'express'
import {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit,
  getUserOutfits
} from '../controllers/outfitController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import rolesMiddleware from '../middleware/rolesMiddleware.js'

const router = express.Router()
router.get('/mine', authMiddleware, getUserOutfits)
router.post('/', authMiddleware, createOutfit)
router.get('/', getOutfits)
router.get('/:id', getOutfitById)
router.put('/:id', authMiddleware, rolesMiddleware('admin', 'user'), updateOutfit)
router.delete('/:id', authMiddleware, rolesMiddleware('admin', 'user'), deleteOutfit)

export default router
