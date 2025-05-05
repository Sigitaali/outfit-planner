import React, { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} style={styles.button}>
      {children}
    </button>
  )
}

const styles = {
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
}

export default PrimaryButton
