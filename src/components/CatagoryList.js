import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import styled from 'styled-components';

const GenreContainerDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    /* width: 20%; */
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin: 1em;
    color: white;
    font-size: 1.5em;

    img {
      box-shadow: 0px 0px 1em 0px rgba(255,255,255,.05);
    }

    img:hover {
      transform: scale(1.0125);
      transition: transform .125s 0s ease-in;
    }
`;

const CatagoryListContainer = styled.div`
    display: flex;
    overflow-x: scroll;
`;


function CatagoryList(props) {

    function catagoryHandler(event) {
        event.preventDefault();
    
        if(event.target.nodeName === 'IMG') {
          console.log(event.target.id)
          
        }
      }

    return (
        <Fragment>
          <h2 style={{color: 'white', fontSize: '3em'}}>Genres</h2>
          <CatagoryListContainer>
              
              {props.genres.map(item => {
          return (
            <GenreContainerDiv onClick={catagoryHandler}>
              <Link to={`/catagory/${item.id}`} ><img src={item.icons[0].url} id={item.id} /> </Link>
              <p>{item.name}</p>
            </GenreContainerDiv>
            )
          })}
          </CatagoryListContainer>
        </Fragment>
    );
}

export default CatagoryList;