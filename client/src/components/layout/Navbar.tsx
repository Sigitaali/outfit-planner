import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar: React.FC = () => {
  const { user, logoutUser } = useAuth()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#f8bbd0', // Pastelinė rožinė
        color: '#333', // Tamsi tekstui
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Outfit Planner
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/outfits">
          Outfits
        </Button>
        <Button color="inherit" component={Link} to="/comments">
          Comments
        </Button>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/my-outfits">
              My Outfits
            </Button>
            <Button color="inherit" component={Link} to="/create-outfit">
              Create Outfit
            </Button>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
