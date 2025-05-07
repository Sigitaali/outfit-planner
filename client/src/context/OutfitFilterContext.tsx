import { createContext, useContext, useReducer } from 'react'
import {
  filterReducer,
  initialFilterState,
  FilterAction,
  FilterState
} from '../reducer/filterReducer'

interface FilterContextType {
  state: FilterState
  dispatch: React.Dispatch<FilterAction>
}

const OutfitFilterContext = createContext<FilterContextType | undefined>(undefined)

export const OutfitFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)

  return (
    <OutfitFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </OutfitFilterContext.Provider>
  )
}

export const useOutfitFilter = () => {
  const context = useContext(OutfitFilterContext)
  if (!context) {
    throw new Error('useOutfitFilter must be used within an OutfitFilterProvider')
  }
  return context
}
