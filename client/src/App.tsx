import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import OutfitsPage from './pages/OutfitsPage'
import CommentsPage from './pages/CommentsPage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import HomePage from './pages/HomePage'
import MyOutfitsPage from './pages/MyOutfitsPage'
import CreateOutfitPage from './pages/CreateOutfitPage'
import CategoryPage from './pages/CategoryPage'
import OutfitsBySubcategoryPage from './pages/OutfitsBySubcategoryPage'
import EditOutfitPage from './pages/EditOutfitPage'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/outfits/:category" element={<OutfitsPage />} />

        <Route
          path="/outfits/:category"
          element={
            <ProtectedRoute>
              <OutfitsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:category" 
        element={
        <CategoryPage />
          } 
        />

        <Route path="/outfits/subcategory/:subcategoryId" 
        element={
        <OutfitsBySubcategoryPage />
        } 
        />

        <Route
          path="/create-outfit"
          element={
            <ProtectedRoute>
              <CreateOutfitPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-outfits"
          element={
            <ProtectedRoute>
              <MyOutfitsPage />
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

        <Route
           path="/edit-outfit/:id"
           element={
          <ProtectedRoute>
              <EditOutfitPage />
          </ProtectedRoute>
        }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
