import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  leaveComment,
  getCommentsByOutfit,
  deleteComment
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', authMiddleware, leaveComment)
router.get('/:outfitId', getCommentsByOutfit)
router.delete('/:id', authMiddleware, deleteComment)

export default router
