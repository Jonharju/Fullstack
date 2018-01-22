import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      string: "",
      countries:[]
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleStringChange = (event) => {
    this.setState({ string: event.target.value })
  }
  setString = newString => () => {
    this.setState({ string: newString })
  }

  render() {
    const countriesToShow = this.state.countries.filter(country => country.name.toLocaleLowerCase().includes(this.state.string.toLocaleLowerCase()))
    return (
      <div>
        Find countries: <input value = {this.state.string} onChange={this.handleStringChange} />
        <Results list = {countriesToShow} method = {this.setString}/>
      </div> 
    );
  }
}
const Results = (props) => {
  if(props.list.length === 0){
    return(
      <div>
      </div>
    )
  } else if(props.list.length > 9){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (props.list.length > 1){
    const rivit = () => props.list.map(country => <li key = {country.name} onClick = {props.method(country.name)}>{country.name}</li>)
    return(
      <div>
        <ul>
          {rivit()}
        </ul>
      </div>
    )
  } else {
    return(
      <div>
        <h2>{props.list[0].name} {props.list[0].nativeName}</h2>
        <p>Capital: {props.list[0].capital}</p>
        <p>Populatuion: {props.list[0].population}</p>
        <img src={props.list[0].flag} alt='The countries flag' height="50%" width="50%" border='2'/>
      </div>
    )
  }
  
}

export default App;
