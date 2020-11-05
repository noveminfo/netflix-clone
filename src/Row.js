import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from './HttpCommon'
import movieTrailer from 'movie-trailer'
import './Row.css'
import YouTube from 'react-youtube'

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  const imgUrl = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(fetchUrl)
        .then((request) => setMovies(request.data.results))
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  const handleClickImg = (movie) => {
    console.log(movie)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie.name || movie.title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClickImg(movie)}
            className={`row__poster row__posterLarge`}
            src={`${imgUrl}${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </div>
      {console.log(trailerUrl)}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  isLargeRow: PropTypes.bool
}

export default Row
