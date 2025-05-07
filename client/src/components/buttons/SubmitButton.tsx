import React from 'react'
import './Button.scss'

interface SubmitButtonProps {
  text: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  color?: 'primary' | 'success' | 'error'
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = 'submit',
  color = 'primary',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${color}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default SubmitButton
