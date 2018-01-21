import React from 'react';

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
      newNumber: ''
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      <div>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons.map(person => 
              <tr key = {person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

export default App