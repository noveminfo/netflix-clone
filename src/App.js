import React from 'react'
import './App.css'
import Row from './Row'
import requests from './Requests'
import Banner from './Banner'
import Nav from './Nav'

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX オリジナル"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="トレンド作品" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="人気タイトル" fetchUrl={requests.fetchTopRated} />
      <Row title="アクション映画" fetchUrl={requests.fetchActionMovies} />
      <Row title="コメディ映画" fetchUrl={requests.fetchComedyMovies} />
      <Row title="ホラー映画" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="恋愛映画" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="ドキュメント" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}

export default App
