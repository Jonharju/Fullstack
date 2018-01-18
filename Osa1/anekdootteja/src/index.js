import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes:[0,0,0,0,0,0],
      mostVoted:0,
      maxVotes:0
    }
  }
  
  next = () => {
    var next = this.state.selected  
    while (next === this.state.selected) {
        next = Math.floor(Math.random() * 6)
    }  
    this.setState({ 
      selected: next
    })
  }

  vote = (index) => {
    var newVotes = this.state.votes
    newVotes[index] = newVotes[index] + 1
    if(newVotes[index] > this.state.maxVotes){
      this.setState({ 
        mostVoted: index,
        maxVotes: newVotes[index]
      })
    }
    this.setState({ 
        votes: newVotes
    })
  }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>Has {this.state.votes[this.state.selected]} votes</p>
        <button onClick = {() => this.vote(this.state.selected)}>
            Vote
        </button>
        <button onClick = {this.next}>
          Next anecdote
        </button>
        <h2>Anecdote with most votes:</h2>
        <p>{this.props.anecdotes[this.state.mostVoted]}</p>
        <p>Has {this.state.votes[this.state.mostVoted]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)