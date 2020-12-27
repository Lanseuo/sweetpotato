import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props { }

interface State { }

const Container = styled.nav`
    background-color: var(--primary-color);
    color: white;
    text-align: left;
    padding: 5px 30px;
    display: grid;
    grid-template-columns: 1fr auto;
    place-items: center start;

    & ul {
        list-style-type: none;
        display: flex;
        flex-direction: row;
    }

    & li {
        margin-left: 25px;
    }

    & a {
        color: white;
    }
`

class NavBar extends Component<Props, State> {
    render() {
        return (
            <Container>
                <h1>Sweetpotato</h1>

                <ul>
                    <li>
                        <Link to="/recipes">All recipes</Link>
                    </li>
                    <li>
                        <Link to="/recipes/create">Create new recipe</Link>
                    </li>
                </ul>
            </Container>
        )
    }
}

export default NavBar