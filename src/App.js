import React, {useState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import CatagoryList from './components/CatagoryList';
import CatagoryPlaylist from './components/CatagoryPlaylist';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState([])

  // console.log('Basic ' + (new Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString('base64')))

  useEffect(()=> {
    const url = 'https://accounts.spotify.com/api/token';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + (new Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: 'grant_type=client_credentials'
    })
    .then(tokenRes => tokenRes.json())
    .then(data => {
      setToken(data.access_token)
      
      fetch('https://api.spotify.com/v1/browse/categories?offset=0&limit=50', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token}
      })
      .then(res => res.json())
      .then(data => setGenres(data.categories.items))

      fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token}
      })
      .then(res => res.json())
      .then(data => console.log(data))
    })
  }, [])
  console.log(genres)

  return (
    <div className="App">
      <Header />
      <Route path='/catagory/:id' exact>
          <CatagoryPlaylist token={token}/>
      </Route>

      <Route path='/' exact>
        <Hero />
        <CatagoryList genres={genres} />
      </Route>

    </div>
  );
}

export default App;
