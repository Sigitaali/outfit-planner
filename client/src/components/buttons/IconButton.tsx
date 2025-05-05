import React, { ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  onClick?: () => void
  title?: string
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, title }) => {
  return (
    <button onClick={onClick} style={styles.button} title={title}>
      {icon}
    </button>
  )
}

const styles = {
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.4rem',
    fontSize: '1.2rem',
    color: '#333'
  }
}

export default IconButton
