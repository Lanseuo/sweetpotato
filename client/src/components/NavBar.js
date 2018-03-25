import React, { Component } from 'react';
import Radium from 'radium';
import styleUtils from './../styleUtils';
import { Link } from 'react-router-dom'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <nav className="NavBar" style={styles.container}>
        <Link to="/"><h1 style={styles.heading}>sweetPotatoe</h1></Link>
      </nav>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(93, 218, 118)',
    padding: '20px 15px'
  },

  heading: {
    color: 'white',
    margin: 0,
    [styleUtils.mediaQueries.mobile]: {
      textAlign: 'center',
    },
  }
}

export default Radium(NavBar);
