import React from 'react';
import styled from 'styled-components';
import spotify from '../images/spotifyBackground.jpg'

const HeroContainer = styled.div`
    background: url(${spotify}), linear-gradient(180deg, rgba(0,33,40,1) 0%, rgba(2,40,51,1) 100%);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: white;
    font-size: 150%;
    box-shadow: #002128 0 0 .75em .25em;
`;

function Hero(props) {
    return (
        <HeroContainer>
            <h2>Musicify | Spotify API Project</h2>
            <p>This project uses Spotify's API to preview the latest music trends without an account.</p>
        </HeroContainer>
    );
}

export default Hero;