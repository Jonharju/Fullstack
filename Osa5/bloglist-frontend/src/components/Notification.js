import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  } else if (error !== null){
    return(
    <div class="error">
      {error}
    </div>
    )
  } else if(message !== null){
    return(
    <div class="success">
      {message}
    </div>
    )
  }

  return (
   <div>

   </div>
  )
}

export default Notification