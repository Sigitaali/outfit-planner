import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  leaveComment,
  getCommentsByOutfit,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
  getMyComments
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', authMiddleware, leaveComment)
router.get('/:outfitId', getCommentsByOutfit)
router.put('/:id', authMiddleware, updateComment)
router.delete('/:id', authMiddleware, deleteComment)
router.get('/', getAllComments)
router.get('/single/:id', getCommentById)
router.get('/my', authMiddleware, getMyComments)


export default router
