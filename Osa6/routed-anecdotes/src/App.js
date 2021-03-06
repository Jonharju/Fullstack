import React from 'react'
import { ListGroup, ListGroupItem, Grid, Col, Thumbnail, Nav, Navbar, NavItem, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import image from './Babbage40.png'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
        {anecdotes.map(anecdote => (
          <ListGroupItem key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </ListGroupItem>
        ))}
      </ListGroup>  
  </div>
)
const menuStyle = {
  color: 'purple',
  background: 'lightblue',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
const activeMenuStyle = {
  fontWeight: 'bold',
  background: 'white',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
const Menu = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Anecdote app
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem href="#">
          <NavLink exact to="/" activeStyle={activeMenuStyle}>anecdotes</NavLink> &nbsp;
        </NavItem>
        <NavItem href="#">
          <NavLink exact to="/create" activeStyle={activeMenuStyle}>create new</NavLink> &nbsp;
        </NavItem>
        <NavItem href="#">  
          <NavLink exact to="/about" activeStyle={activeMenuStyle}>about</NavLink>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>
      Has {anecdote.votes} votes
    </div>
    <div>
      For more info see <a href = {anecdote.info}>{anecdote.info}</a>  
    </div>
  </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid className="show-grid">
      <Col md={6}>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col md={3}>
        <Thumbnail src={image} responsive='true' />
      </Col>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content:</ControlLabel>
            <FormControl
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            />
            <ControlLabel>author:</ControlLabel>
            <FormControl
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>info:</ControlLabel>
            <FormControl
              type="text"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'a new anecdote '+anecdote.content +' created!' 
    })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  
    render() {
      const notificationStyle = {
        color: 'green',
        background: 'white',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: 'green',
        padding: 10,
        marginBottom: 10
      }      
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {this.state.notification === '' ? '' : 
            <p style={notificationStyle}>{this.state.notification}</p>}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/> } />
            <Route path="/about" render={() => <About /> } />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
