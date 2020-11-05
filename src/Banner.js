import React, { useState, useEffect } from 'react'
import requests from './Requests'
import axios from './HttpCommon'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(requests.fetchNetflixOriginals)
        .then((response) =>
          setMovie(
            response.data.results[
              Math.floor(Math.random() * response.data.results.length - 1)
            ]
          )
        )
    }
    fetchData()
  }, [])

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: 'center center'
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.orginal_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">プレイ</button>
          <button className="banner__button">マイリスト</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 200)}</h1>
      </div>
      
      <div className='banner--fadeBottom'></div>
    </header>
  )
}

export default Banner
