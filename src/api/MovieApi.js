export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3/movie/'
  _apiBasePopular = 'https://api.themoviedb.org/3/movie/popular?'
  _apiBaseTopRated = 'https://api.themoviedb.org/3/movie/top_rated?'
  _apiBaseUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?'
  _apiBaseBySearch = 'https://api.themoviedb.org/3/search/movie?'
  _apiKey = 'api_key=f24a0fd18f52218851075901c5a108a0'
  _imgBase = 'https://image.tmdb.org/t/p/w500'
  
  getResource = async(url) => {
    const res = await fetch(url)
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }
  
  getData = (base, page, query) => async() => {
    const url = this._getQueryUrl(base, page, query)
    const res = await this.getResource(url)
    return res.results.map(this._transformMovie)
  }
  
  getTotalPages = async (func, query) => {
    let apiBase
    switch(func) {
      case('getPopular'):
        apiBase = this._apiBasePopular
        break
      case('getTopRated'):
        apiBase = this._apiBaseTopRated
        break
      case('getUpcoming'):
        apiBase = this._apiBaseUpcoming
        break
      case('getBySearch'):
        apiBase = this._apiBaseBySearch
        break
      default:
        return new Error(`Impossible to determine the apiBase for fetching total pages`)
    }
    const data = await this.getResource(
      this._getQueryUrl(apiBase,1, query))
    
    return data.total_pages
  }
  
  getPopular = async(page) => {
    return this.getData(this._apiBasePopular, page)()
  }
  
  getTopRated = async(page) => {
    return this.getData(this._apiBaseTopRated, page)()
  }
  
  getUpcoming = async(page) => {
    return this.getData(this._apiBaseUpcoming, page)()
  }
  
  getBySearch = (page, query) => {
    return this.getData(this._apiBaseBySearch, page, query)()
  }
  
  getMovieDetails = async(id) => {
    const url = `${this._apiBase}${id}?${this._apiKey}`
    const res = await this.getResource(url)
    return this._transformMovieDetails(res)
  }
  
  _getQueryUrl = (base, page, query) => {
    const url = `${base}${this._apiKey}&page=${page}`
    return !query ? url : `${url}&query=${query}`
  }
  
  _transformMovie = (movie) => {
    const {id, title, vote_average, poster_path, release_date} = movie
    return {
      id,
      title,
      rating: this._transformRating(vote_average),
      poster: this._transformPoster(poster_path),
      release: release_date ? this._transformDate(release_date) : 'unknown'
    }
  }
  
  _transformMovieDetails = (movie) => {
    const {id, title, tagline, revenue, budget, runtime, overview,
      vote_average, genres, release_date, production_countries, poster_path} = movie
    
    return {
      id,
      title,
      tagline,
      overview,
      revenue: revenue ? `$${revenue}` : 'unknown',
      budget: budget ? `$${budget}` : 'unknown',
      runtime: runtime ? `${runtime} minutes` : 'unknown',
      rating: this._transformRating(vote_average),
      genres: this._transformPropToString(genres).toLowerCase(),
      year: release_date.substring(0, 4) || 'unknown',
      productionCountries: this._transformPropToString(production_countries),
      poster: this._transformPoster(poster_path)
    }
  }
  
  _transformPoster = (poster) => {
    return poster ? this._imgBase + poster : poster
  }
  
  _transformDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    date = date.split('-').reverse()
    date[1] = months[date[1] - 1]
    return date.join(' ')
  }
  
  _transformPropToString = (arr) => {
    return arr.length ? arr.map(({name}) => name).join(', ') : 'unknown'
  }
  
  _transformRating = (rating) => {
    if(!rating) {
      return 'NR'
    } else if(rating === Math.floor(rating)) {
      return `${rating}.0`
    } else {
      return rating.toString()
    }
  }
}