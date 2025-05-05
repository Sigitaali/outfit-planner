import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface DangerButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const DangerButton: React.FC<DangerButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} style={styles.button}>
      {children}
    </button>
  )
}

const styles = {
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
}

export default DangerButton
