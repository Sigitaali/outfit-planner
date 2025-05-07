export interface FilterState {
    subcategory: string | null
    userOnly: boolean
  }
  
  export type FilterAction =
    | { type: 'SET_SUBCATEGORY'; payload: string }
    | { type: 'TOGGLE_USER_ONLY' }
  
  export const initialFilterState: FilterState = {
    subcategory: null,
    userOnly: false,
  }
  
  export function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
      case 'SET_SUBCATEGORY':
        return { ...state, subcategory: action.payload }
      case 'TOGGLE_USER_ONLY':
        return { ...state, userOnly: !state.userOnly }
      default:
        return state
    }
  }
  