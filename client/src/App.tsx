import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { OutfitFilterProvider } from './context/OutfitFilterContext'
import OutfitsPage from './pages/OutfitsPage'
import OutfitDetailsPage from './pages/OutfitDetailsPage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import HomePage from './pages/HomePage'
import MyOutfitsPage from './pages/MyOutfitsPage'
import CreateOutfitPage from './pages/CreateOutfitPage'
import CategoryPage from './pages/CategoryPage'
import OutfitsBySubcategoryPage from './pages/OutfitsBySubcategoryPage'
import EditOutfitPage from './pages/EditOutfitPage'
import { NotificationProvider } from './context/NotificationContext'
import AllCommentsPage from './pages/AllCommentsPage'
import SingleCommentPage from './pages/SingleCommentPage'
import AdminOutfitsPage from './pages/AdminOutfitsPage'
import AdminCommentsPage from './pages/AdminCommentsPage'

const App = () => {
  return (
    <NotificationProvider> { }
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />

        <Route
          path="/outfits"
          element={
            <OutfitFilterProvider>
              <OutfitsPage />
            </OutfitFilterProvider>
          }
        />

        <Route
          path="/outfits/:category"
          element={
            <OutfitFilterProvider>
              <OutfitsPage />
            </OutfitFilterProvider>
          }
        />

        <Route path="/outfits/:category" element={<OutfitsPage />} />
        <Route path="/outfits/subcategory/:subcategoryId" element={<OutfitsBySubcategoryPage />} />
        <Route path="/outfits/details/:id" element={<OutfitDetailsPage />} />
        <Route path="/comments" element={<AllCommentsPage />} />
        <Route path="/comments/:id" element={<SingleCommentPage />} />
        <Route path="/admin/outfits" element={<AdminOutfitsPage />} />
        <Route path="/admin/comments" element={<AdminCommentsPage />} />
        


        <Route
          path="/create-outfit"
          element={
            <ProtectedRoute>
              <CreateOutfitPage />
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
          path="/my-outfits"
          element={
            <ProtectedRoute>
              <MyOutfitsPage />
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
    </NotificationProvider>
  )
}

export default App
