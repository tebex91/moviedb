import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/MainPage.sass'
import collage from '../styles/Сollage.jpg'

const MainPage = () => {
  return (
    <div className="main-page">
      <h1>welcome to the world of cinema</h1>
      <Link to="list/top_rated">
        <div className="collage">
        <div className="shadow" />
        <img src={collage} alt="collage" />
        </div>
      </Link>
    </div>
  )
}

export default MainPage