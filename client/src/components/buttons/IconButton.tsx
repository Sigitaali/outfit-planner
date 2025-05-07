import React, { ReactNode } from 'react'
import './Button.scss'

interface IconButtonProps {
  icon: ReactNode
  onClick?: () => void
  title?: string
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, title }) => {
  return (
    <button onClick={onClick} title={title} className="button button--icon">
      {icon}
    </button>
  )
}

export default IconButton
