import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipePreview extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <Link to={String(this.props.id)} className="RecipePreview" style={styles.container}>
        <div style={{ ...styles.image, backgroundImage: 'url(http://localhost:5000' + this.props.image + ')' }}></div>
        <div style={styles.details}>
          <h3>{this.props.name}</h3>
          <small style={styles.time}>{this.props.time} Minuten</small>
        </div>
      </Link>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(237, 237, 237)',
    borderRadius: '2px'
  },

  image: {
    borderTopRightRadius: '2px',
    borderTopLeftRadius: '2px',
    width: '100%',
    height: '250px',
    // backgroundImage: ,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },

  details: {
    padding: '10px'
  },

  time: {
    display: 'block',
    textAlign: 'right'
  }
}

export default RecipePreview;
