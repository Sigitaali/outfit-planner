import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Usser already exists' })

    const hashed = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashed
    })

    res.status(201).json({
      message: 'Registration successful',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    })
    
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Incorrect password' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message })
  }
}
