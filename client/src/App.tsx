import Navbar from './components/layout/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import OutfitsPage from './pages/OutfitsPage'
import CommentsPage from './pages/CommentsPage'
import ProtectedRoute from './components/layout/ProtectedRoute'

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/outfits"
          element={
            <ProtectedRoute>
              <OutfitsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comments"
          element={
            <ProtectedRoute>
              <CommentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
