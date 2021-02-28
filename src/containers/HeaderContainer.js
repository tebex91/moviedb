import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../components/Header'

const HeaderContainer = ({ selectedFilms }) => {
  return <Header selectedFilms={selectedFilms} />
}

Header.propTypes = {
  selectedFilms: PropTypes.array.isRequired
}

export default connect(({ selectedFilms }) => ({ selectedFilms }))(HeaderContainer)