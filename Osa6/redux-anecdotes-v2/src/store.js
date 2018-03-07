import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { initialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initialization(anecdotes))
)

export default store