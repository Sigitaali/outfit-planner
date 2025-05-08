import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logoutUser } = useAuth()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#424242',
        color: '#fff',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, mb: { xs: 1, sm: 0 } }}>
          Outfit Planner
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-end' },
          }}
        >
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/outfits">Outfits</Button>
          <Button color="inherit" component={Link} to="/comments">Comments</Button>

          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
              <Button color="inherit" component={Link} to="/my-outfits">My Outfits</Button>
              <Button color="inherit" component={Link} to="/create-outfit">Create Outfit</Button>
              {user.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin/outfits">
                  Admin Panel
                </Button>
              )}
              {user?.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin/comments">
                 Admin Comments
                </Button>
      )}

              <Button color="inherit" onClick={logoutUser}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
