import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.scss'

interface DangerButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const DangerButton: React.FC<DangerButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className="button button--error">
      {children}
    </button>
  )
}

export default DangerButton
