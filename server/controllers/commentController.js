import Comment from '../models/Comment.js'

export const leaveComment = async (req, res) => {
  try {
    const { text, user, outfit } = req.body
    const comment = await Comment.create({ text, user, outfit })
    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getCommentsByOutfit = async (req, res) => {
  try {
    const outfitId = req.params.outfitId
    const comments = await Comment.find({ outfit: outfitId }).populate('user', 'username')
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Comment.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Comment not found' })
    res.status(200).json({ message: 'Comment deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
