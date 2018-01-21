import React from 'react';
import Numbers from './components/Numbers';
import Input from './components/Input';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
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
      persons = persons.concat(contactObject)
    }

    this.setState({
      persons: persons,
      newName: '',
      newNumber:''
    })
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
            <button type="submit">lisää</button>
          </div>
        </form>
      <Numbers persons = {this.state.persons} contactsToShow = {contactsToShow}/>
    </div>
    )
  }
}

export default App