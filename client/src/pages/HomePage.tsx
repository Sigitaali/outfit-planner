import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.scss'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <h1 className="home-title">Choose Your Style</h1>

      <div className="category-grid">
        <div className="category-card" onClick={() => navigate('/category/women')}>
          <img
            src="/pictures/atsisiųsti.jpg"
            alt="Women"
            className="category-image"
          />
          <h2>Women</h2>
        </div>

        <div className="category-card" onClick={() => navigate('/category/men')}>
          <img
            src="/pictures/mens fashion week.avif"
            alt="Men"
            className="category-image"
          />
          <h2>Men</h2>
        </div>
      </div>

      <button className="explore-button" onClick={() => navigate('/outfits')}>
          Explore All Outfits
      </button>

    </div>
  )
}

export default HomePage
