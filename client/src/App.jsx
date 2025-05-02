import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/main.scss'
import Button from '@mui/material/Button'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Outfit Planner 👗</h1>
      <Button variant="contained" color="primary">
        MUI mygtukas veikia!
      </Button>
    </div>
  );
}

export default App
