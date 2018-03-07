import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = []
//[
//  'If it hurts, do it more often',
//  'Adding manpower to a late software project makes it later!',
//  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//  'Premature optimization is the root of all evil.',
//  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//]

//const getId = () => (100000*Math.random()).toFixed(0)

//const asObject = (anecdote) => {
//  return {
//    content: anecdote,
//    id: getId(),
//    votes: 0
//  }
//}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = anecdotesAtStart, action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.data.id)
    //const voted = store.find(a => a.id === action.data.id)

    return [...old, action.data ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  } if(action.type === 'INIT') {
    return action.data
  }

  return store
}

export const initialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(data.id, data)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer