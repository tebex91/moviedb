import React from 'react'

import MovieApiService from '../services/MovieApiService'

const withMovieApiService = (Wrapped) => {
  const movieApi = new MovieApiService()
  return (props) => {
    return (<Wrapped {...props} movieApi={movieApi} />)
  }
}

export default withMovieApiService;