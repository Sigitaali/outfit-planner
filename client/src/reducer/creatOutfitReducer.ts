export interface OutfitFormState {
  title: string
  description: string
  imageUrl: string
  items: string
  category: string
  subcategory: string
}

type Action =
  | { type: 'SET_FIELD'; field: keyof OutfitFormState; value: string }
  | { type: 'RESET' }

export const outfitFormReducer = (
  state: OutfitFormState,
  action: Action
): OutfitFormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return {
        title: '',
        description: '',
        imageUrl: '',
        items: '',
        category: '',
        subcategory: ''
      }
    default:
      return state
  }
}
