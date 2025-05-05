import React from 'react'

interface SubmitButtonProps {
  text: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  color?: 'primary' | 'success' | 'error' | 'default'
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = 'submit',
  color = 'primary',
}) => {
  const bgColors: Record<string, string> = {
    primary: '#1976d2',
    success: '#388e3c',
    error: '#d32f2f',
    default: '#333',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: bgColors[color],
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.6rem 1.2rem',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
    >
      {text}
    </button>
  )
}

export default SubmitButton
