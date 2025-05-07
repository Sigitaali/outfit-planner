import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  leaveComment,
  getCommentsByOutfit,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', authMiddleware, leaveComment)
router.get('/:outfitId', getCommentsByOutfit)
router.put('/:id', authMiddleware, updateComment)
router.delete('/:id', authMiddleware, deleteComment)
router.get('/', getAllComments)
router.get('/single/:id', getCommentById)


export default router
