const initialState = ''

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.content
  default:
    return store
  }
}

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'SET',
        content: ''
      })
    }, 1000*time)
  }
}
export default notificationReducer