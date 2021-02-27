import React from 'react'

import MovieApi from '../api/MovieApi'

const withMovieApi = (Wrapped) => {
  const movieApi = new MovieApi()
  return (props) => {
    return (<Wrapped {...props} movieApi={movieApi} />)
  }
}

export default withMovieApi;