import React from 'react'

const Input = ({text, value, method}) => {
    return(
        <div>
          {text} <input value = {value} onChange={method} />
        </div>  
    )
}
export default Input