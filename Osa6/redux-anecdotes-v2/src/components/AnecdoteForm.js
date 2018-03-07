import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.setNotification('"'+content + '" added')
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
