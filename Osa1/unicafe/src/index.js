import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali:0,
        huono:0,
        keskiarvo:0,
        kaikkiaan:0
      }
    }
    
    render(){
         
      return (
        <div>
          <h1>Anna palautetta</h1>
          <button onClick={() => this.setState({hyva: this.state.hyva +1, keskiarvo: this.state.keskiarvo +1, kaikkiaan: this.state.kaikkiaan +1})}>
            Hyvä
          </button>
          <button onClick={() => this.setState({neutraali: this.state.neutraali +1, kaikkiaan: this.state.kaikkiaan +1})}>
            Neutraali
          </button>
          <button onClick={() => this.setState({huono: this.state.huono +1, keskiarvo: this.state.keskiarvo -1, kaikkiaan: this.state.kaikkiaan +1})}>
            Huono
          </button>
          <h2>Statistiikkaa</h2> 
          <p>Hyvä:{this.state.hyva}</p>
          <p>Neutraali:{this.state.neutraali}</p>
          <p>Huono:{this.state.huono}</p>
          <p>Keskiarvo:{this.state.keskiarvo/this.state.kaikkiaan}</p>
          <p>Positiivisia:{100*this.state.hyva/this.state.kaikkiaan}%</p>
        </div>
        )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

