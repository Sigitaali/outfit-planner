import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import SubmitButton from '../components/buttons/SubmitButton'
import IconButton from '../components/buttons/IconButton'

type UserData = {
  username: string
  email: string
  role: string
}

const ProfilePage = () => {
  const { logoutUser } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await axios.get<UserData>('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUserData(res.data)
      } catch (err) {
        console.error('Error loading user:', err)
      }
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <p>Loading user info...</p>
  }

  return (
    <div className="profile-container">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span role="img" aria-label="user">👤</span> Profile
      </h1>

      <div className="profile-box">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SubmitButton onClick={() => navigate('/outfits')} text="View My Outfits" color="success" />
        <SubmitButton onClick={() => navigate('/comments')} text="View My Comments" color="success" />
        <SubmitButton onClick={logoutUser} text="Logout" color="error" />
      </div>
    </div>
  )
}

export default ProfilePage
