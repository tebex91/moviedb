import React from 'react'

import '../styles/ErrorPage.sass'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <span className="code">404</span>
      <span className="text">page not found</span>
    </div>
  )
}

export default ErrorPage