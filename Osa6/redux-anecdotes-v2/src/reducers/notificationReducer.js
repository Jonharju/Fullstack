const initialState = ''

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.content
  default:
    return store
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET',
    content
  }
}
export default notificationReducer