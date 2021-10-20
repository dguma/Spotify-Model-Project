import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
`;

const PlaylistContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    color: white;
    font-size: 1.25em;
    margin-top: 2em;

    .contentContainer {
        width: 25%;
        height: 25%;

        .innerContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 2em;
        }
    }

    @media screen and (max-width:828px) {
        .contentContainer {
            width: 100%;
            height: 100%;
        }
    }
`;

const PlaylistListContainer = styled.div`
    width: 100%;
    height: 40vh;
    overflow-y: scroll;
    color: white;
    background: radial-gradient(circle, rgba(2,40,51,1) 0%, rgba(0,33,40,1) 100%);
    box-shadow: #002128 0 0 .75em .25em;

    h1 {
        text-align: center;
        text-transform: uppercase;
    }

    h3 {
        text-align: center;
        margin: 5em 0;
    }

    ul {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        list-style-type: none;
        padding-left: 0;
        font-size: 1.25em;

        a {
            color: white;
        }

        li {
            padding: 1em;
        }
    }

`;

function CatagoryPlaylist(props) {

const [catagory, setCatagory] = useState([]);
const [playlists, setPlaylists] = useState();
const [playlistContent, setPlaylistContent] = useState([]);

useEffect(() => {
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
    .then((data) => {
        fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token}
        })
        .then(res => res.json())
        .then(data => {
            setPlaylists(data.playlists.items)
        })
    })
    
}, [])

console.log(playlists)
console.log(playlistContent)


let {id} = useParams();

function handler(event) {
    event.preventDefault();
    console.log(event.target.id)
    fetch(event.target.id , {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + props.token}
        })
        .then(res => res.json())
        .then(data => {
            setPlaylistContent(data.items)
        })
    
}

    return (
        <div>
            

           <PlaylistListContainer>
                <h1>{id}</h1>

                {(playlistContent.length === 0) ? 
                <h3>Select a playlist</h3> : <ul>
                    {playlistContent.map((data) => {
                        return (
                            <a href={data.track.preview_url} >
                                <li>
                                    {data.track.name}
                                    <audio src={data.track.preview_url}/>
                                </li>
                            </a>
                            
                        )
                    })}
                </ul>}
          </PlaylistListContainer>
           
            <PlaylistContainer>
           {
           (playlists !== undefined) ?
           playlists.map(data => {
               return (
                   <div className='contentContainer'>
                        <div className='innerContent'>
                            <p>{data.name}</p>
                            <Thumbnail onClick={handler} id={data.tracks.href} src={data.images[0].url} />
                        </div>
                   </div>
               )
           }) : ''
        }
        </PlaylistContainer>
        </div>
    );
}

export default CatagoryPlaylist;