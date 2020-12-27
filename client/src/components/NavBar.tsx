import React, { Component } from 'react'
import styled from 'styled-components'

interface Props { }

interface State { }

const Container = styled.nav`
    background-color: var(--primary-color);
    color: white;
    text-align: left;
    padding: 5px 30px;
`

class NavBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <h1>Sweetpotato</h1>
            </Container>
        )
    }
}

export default NavBar