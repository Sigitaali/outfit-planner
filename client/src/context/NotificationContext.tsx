import { createContext, useContext, useState, ReactNode } from 'react'

type NotificationType = 'success' | 'error'

interface NotificationContextType {
  message: string
  type: NotificationType
  showNotification: (msg: string, type: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NotificationType>('success')

  const showNotification = (msg: string, type: NotificationType) => {
    setMessage(msg)
    setType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <NotificationContext.Provider value={{ message, type, showNotification }}>
      {message && <div className={`notification ${type}`}>{message}</div>}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within NotificationProvider')
  return context
}
