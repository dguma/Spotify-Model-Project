import React, {useState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import CatagoryList from './components/CatagoryList';
import CatagoryPlaylist from './components/CatagoryPlaylist';



function App() {

  const spotify = {
    clientId: 'a52e57521e2f49a88c43eae0080eb576',
    clientSecret: '6bda5bd705784296b082da507e5909d5'
  }

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState([])

  // console.log('Basic ' + (new Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString('base64')))

  useEffect(()=> {
    const url = 'https://accounts.spotify.com/api/token';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + (new Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString('base64'))
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
      
      <Route path='/catagory/:id' exact>
          <CatagoryPlaylist token={token} spotify={spotify}/>
      </Route>

      <Route path='/' exact>
        <CatagoryList genres={genres} />
      </Route>

    </div>
  );
}

export default App;
