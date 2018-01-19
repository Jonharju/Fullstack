import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa.nimi} {props.osa.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  return(
    <div>
      {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}
const Yhteensa = (props) => {
  const result = props.kurssi.osat.map(osa => osa.tehtavia)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return(
    <p>yhteensä {result.reduce(reducer)} tehtävää</p>
  )
}
const Kurssit = (props) =>{ 
  return (
    <div>
      <h1>Opetusohjelma</h1>
      {props.kurssit.map((kurssi, i) => <Kurssi key = {i} kurssi={kurssi} />)}
    </div>
  )
}
const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi}  />
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Kurssit kurssit={kurssit} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)