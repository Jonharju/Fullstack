import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi}  />
    </div>
  )
}

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

export default Kurssi