import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Vartotojas jau egzistuoja' })

    const hashed = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashed
    })

    res.status(201).json({ message: 'Registracija sėkminga' })
  } catch (err) {
    res.status(500).json({ message: 'Serverio klaida', error: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Vartotojas nerastas' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Neteisingas slaptažodis' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Prisijungimo klaida', error: err.message })
  }
}
