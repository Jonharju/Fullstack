const initialState = ''

const filterReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.content
  default:
    return store
  }
}

export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    content
  }
}
export default filterReducer