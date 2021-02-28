import React, { useState } from 'react'

import '../styles/ArrowUp.sass'

const ArrowUp = () => {
  const [yScroll, setYScroll] = useState(0)
  
  window.addEventListener('scroll', () => setYScroll(window.pageYOffset))
  const screenHeight = document.documentElement.clientHeight
  
  const visibleClass = yScroll > screenHeight * 1.5 ? 'visible' : 'hidden'
  
  return (
    <div className={`arrow-up ${visibleClass}`}>
      <i className="fa fa-angle-up"
         aria-hidden="true"
         onClick={() => window.scrollTo(0, 0) } />
    </div>
  )
}

export default ArrowUp