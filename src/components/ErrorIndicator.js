import React from 'react'

import '../styles/ErrorIndicator.sass'
import errorLogo from '../styles/img/Error.png'

const ErrorIndicator = () => {
  return (
    <div className="error-message">
      <img src={errorLogo} alt="error"/>
      <p>oops! something went wrong</p>
      <p>please, try again late</p>
    </div>
  )
}

export default ErrorIndicator