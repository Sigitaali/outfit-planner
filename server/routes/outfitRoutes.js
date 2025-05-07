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

const router = express.Router()


router.get('/mine', authMiddleware, getUserOutfits)
router.post('/', authMiddleware, createOutfit)
router.get('/', getOutfits)
router.get('/:id', getOutfitById)
router.put('/:id', authMiddleware, updateOutfit)
router.delete('/:id', authMiddleware, deleteOutfit)

export default router
