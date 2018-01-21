import React from 'react'

const Numbers = ({persons, contactsToShow, method}) => {
  return(
      <div>
        <h2>Numerot</h2>
          <table>
            <tbody>
              {contactsToShow.map(person => 
                <tr key = {person.name}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td><button onClick = {() => method(person)}>Poista</button></td>
                </tr>
                )}
            </tbody>
          </table>
      </div>
    )
}

export default Numbers