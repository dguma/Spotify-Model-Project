import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function CatagoryPlaylist(props) {

const [catagory, setCatagory] = useState([]);
const [playlists, setPlaylists] = useState();

useEffect(() => {
    const url = 'https://accounts.spotify.com/api/token';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + (new Buffer.from(props.spotify.clientId + ':' + props.spotify.clientSecret).toString('base64'))
      },
      body: 'grant_type=client_credentials'
    })
    .then(tokenRes => tokenRes.json())
    .then((data) => {
        fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token}
        })
        .then(res => res.json())
        .then(data => setPlaylists(data.playlists.items))
    })
    
}, [])

console.log(playlists)

let {id} = useParams();

    return (
        <div>
           <h1>{id}</h1>

           {
           (playlists !== undefined) ?
           playlists.map(data => {
               return (
                   <div>
                       <img src={data.images[0].url} />
                       <p>{data.name}</p>
                   </div>
               )
           }) : ''
        }
        </div>
    );
}

export default CatagoryPlaylist;