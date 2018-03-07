import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.store.dispatch(voteAnecdote(anecdote.id))
    this.props.store.dispatch(setNotification('Voted for "'+anecdote.content+'"'))
    setTimeout(() => {
      this.props.store.dispatch(setNotification(''))
    }, 5000)
  }
  render() {
    var anecdotes = this.props.store.getState().anecdotes
    const f = this.props.store.getState().filter
    anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(f))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
