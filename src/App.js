import React, { Component } from 'react';
import './App.css';

import Movie from './Movie'

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = { }

  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async() => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json()) // fetch에서 받은 데이터를 response로 체크하고, json으로 변환
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    // const 변수는 상수(변하지 않는 값)와 같은 성격으로 -> 재할당 할 경우 에러 발생
    const movies = this.state.movies.map(movie => {

      return <Movie
        title = { movie.title }
        poster = { movie.medium_cover_image }
        genres = { movie.genres }
        synopsis = { movie.synopsis }
        key = { movie.id }
      />
    })
    return movies
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading..'}
      </div>
    );
  }
}

export default App;
