import React, { ReactNode } from 'react'
import './Button.scss'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className="button button--success">
      {children}
    </button>
  )
}

export default PrimaryButton
