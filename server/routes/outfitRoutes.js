import express from 'express'
import {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit
} from '../controllers/outfitController.js'

const router = express.Router()

router.post('/', createOutfit)
router.get('/', getOutfits)
router.get('/:id', getOutfitById)
router.put('/:id', updateOutfit)
router.delete('/:id', deleteOutfit)

export default router
