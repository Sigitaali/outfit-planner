import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: string
  username?: string
  email?: string
  role: string
  exp: number
  iat: number
}

interface AuthContextType {
  user: DecodedToken | null
  loading: boolean
  loginUser: (token: string) => void
  logoutUser: () => void
  updateUser: (newUser: Partial<DecodedToken>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)

        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
        } else {
          localStorage.removeItem('token')
        }
      } catch {
        localStorage.removeItem('token')
      }
    }

    setLoading(false)
  }, [])

  const loginUser = (token: string) => {
    localStorage.setItem('token', token)
    const decoded: DecodedToken = jwtDecode(token)
    setUser(decoded)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (newUser: Partial<DecodedToken>) => {
    setUser((prevState) =>
      prevState ? { ...prevState, ...newUser } : prevState
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }
  return context
}
