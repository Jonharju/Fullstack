import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification('Voted for "'+anecdote.content+'"')
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }
  render() {
    var anecdotes = this.props.anecdotes
    const f = this.props.filter
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
