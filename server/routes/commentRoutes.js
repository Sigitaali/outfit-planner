import express from 'express'
import {
  leaveComment,
  getCommentsByOutfit,
  deleteComment
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', leaveComment)
router.get('/:outfitId', getCommentsByOutfit)
router.delete('/:id', deleteComment)

export default router
