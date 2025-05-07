import Comment from '../models/Comment.js'

export const leaveComment = async (req, res) => {
  try {
    const { text, outfit, rating } = req.body

    if (!text || !outfit || !rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: 'Text, outfit, and valid rating (1–5) are required.' })
    }

    const comment = await Comment.create({
      text,
      outfit,
      rating,
      user: req.user.id
    })

    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getCommentsByOutfit = async (req, res) => {
  try {
    const outfitId = req.params.outfitId
    const comments = await Comment.find({ outfit: outfitId })
      .populate('user', 'username')
      .sort({ createdAt: -1 })

    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })

    if (req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' })
    }

    comment.text = req.body.text
    comment.rating = req.body.rating
    await comment.save()

    res.status(200).json(comment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await Comment.findById(id)
    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    const isOwner = comment.user.toString() === req.user.id
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to delete this comment' })
    }

    await comment.deleteOne()
    res.status(200).json({ message: 'Comment deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'username')
      .populate('outfit', 'title')
      .sort({ createdAt: -1 })

    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('user', 'username')
      .populate('outfit', 'title')

    if (!comment) return res.status(404).json({ message: 'Comment not found' })
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
