import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = store.getState()

  if (palautteita.good === 0 && palautteita.bad === 0 && palautteita.ok === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteita.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteita.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteita.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(palautteita.good-palautteita.bad)/(palautteita.good+palautteita.ok+palautteita.bad)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{palautteita.good/(palautteita.good+palautteita.ok+palautteita.bad)}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK'})}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)
