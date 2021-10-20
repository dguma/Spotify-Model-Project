import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    width: 100%;
    height: 10%;
    background-color: #00b361;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    a {
        text-decoration: none;
    }

    h1 {
        color: white;
    }

    ul {
        display: flex;
        list-style-type: none;

        li {
            margin: 0 1em;
        }
    }
`;

function Header(props) {
    return (
        <HeaderContainer>
            <Link to='/'><h1>Musicify</h1></Link>
        </HeaderContainer>
    );
}

export default Header;