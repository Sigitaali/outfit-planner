import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import rolesMiddleware from '../middleware/rolesMiddleware.js'
import {
  leaveComment,
  getCommentsByOutfit,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById
} from '../controllers/commentController.js'

const router = express.Router()

router.get('/single/:id', getCommentById)
router.get('/', getAllComments)
router.get('/:outfitId', getCommentsByOutfit)
router.post('/', authMiddleware, leaveComment)
router.put('/:id', authMiddleware, rolesMiddleware('admin', 'user'), updateComment)
router.delete('/:id', authMiddleware, rolesMiddleware('admin', 'user'), deleteComment)

export default router
