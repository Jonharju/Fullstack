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
    klik = (kutsuja) =>{
        if(kutsuja === "Hyvä"){
            this.klikHyva()
        } else if(kutsuja === "Neutraali"){
            this.klikNeutraali()
        } else if(kutsuja === "Huono"){
            this.klikHuono()
        } else {

        }
    }

    klikHyva = () =>{
        this.setState({
          hyva: this.state.hyva +1,
          keskiarvo: this.state.keskiarvo +1, 
          kaikkiaan: this.state.kaikkiaan +1
        })
    }
    klikNeutraali = () =>{
        this.setState({
          neutraali: this.state.neutraali +1,
          kaikkiaan: this.state.kaikkiaan +1
        })
    }

    klikHuono = () =>{
        this.setState({
          huono: this.state.huono +1,
          keskiarvo: this.state.keskiarvo -1,
          kaikkiaan: this.state.kaikkiaan +1
        })
    }

    render(){         
      return (
        <div>
          <h1>Anna palautetta</h1>
          <Button 
            text="Hyvä" 
            metodi={() => this.klik("Hyvä")}
          />
          <Button 
            text="Neutraali" 
            metodi={() => this.klik("Neutraali")} 
          />
          <Button 
            text="Huono" 
            metodi={() => this.klik("Huono")} 
          />
          <Statistics state ={this.state} />
        </div>
        )
  }
}

const Button = (props) =>{
  return (
    <button onClick={props.metodi}>
      {props.text}
    </button>
  )
}

const Statistics = (props) =>{
  if(props.state.hyva === 0 && props.state.neutraali === 0 && props.state.huono === 0){
    return(
        <div>
          <h2>Statistiikkaa</h2> 
          <p>Yhtään palautetta ei ole annettu</p>
        </div>
    )
  }
  return (
    <div>
      <h2>Statistiikkaa</h2> 
      <Statistic text= "Hyvä: " value={props.state.hyva}/>
      <Statistic text= "Neutraali: " value={props.state.neutraali}/>
      <Statistic text= "Huono: " value={props.state.huono}/>
      <Statistic text= "Keskiarvo: " value={props.state.keskiarvo/props.state.kaikkiaan}/>
      <Statistic text= "Positiivisia: " value={100*props.state.hyva/props.state.kaikkiaan}/>
    </div>
  )
}
const Statistic = (props) =>{
  if(props.text === "Positiivisia: "){
    return (
      <div>
        <p>{props.text}{props.value} %</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{props.text}{props.value}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

