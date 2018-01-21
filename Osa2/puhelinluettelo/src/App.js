import React from 'react';
import Numbers from './components/Numbers';
import Input from './components/Input';
import contactService from './services/contacts'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
    console.log('constructor')
  }
  componentWillMount() {
    console.log('will mount')
    contactService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    var persons = this.state.persons
    const names = this.state.persons.map(person => person.name)
    if(!names.includes(contactObject.name)){
      contactService
        .create(contactObject)
        .then(response => {
          this.setState({
            persons: persons.concat(response.data),
            newName: '',
            newNumber:''
          })
        }) 
    } else{
      if (window.confirm(contactObject.name+" on jo luettelossa, korvataanko vanha numero uudella?")) {
        const person = this.state.persons.find(p => p.name === contactObject.name)
        const newPerson = {...person, number: contactObject.number}
        contactService
          .update(person.id,newPerson)
          .then(response => {
            this.setState({
              persons: this.state.persons.map(p => p.id !== person.id ? p : newPerson),
              newName: '',
              newNumber:''
            })
          })
      }
    }
  }

  removeContact = (person) => {
    if (window.confirm("Poistetaanko "+person.name+" ?")) {
      contactService
        .remove(person.id)
        .then(response => {
          const persons = this.state.persons.filter(p => p.id !== person.id)
          this.setState({
            persons: persons
          })
        })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    console.log('render')
    const contactsToShow = this.state.persons.filter(person => person.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase()))
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Input text = {'Rajaa näytettäviä'} value = {this.state.filter} method={this.handleFilterChange} />  
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addContact}>
          <Input text = {'Nimi:'} value={this.state.newName} method={this.handleNameChange} />
          <Input text = {'Numero:'} value={this.state.newNumber} method={this.handleNumberChange} />
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
      <Numbers persons = {this.state.persons} contactsToShow = {contactsToShow} method = {this.removeContact} />
    </div>
    )
  }
}

export default App