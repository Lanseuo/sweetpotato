import React, { Component } from 'react';
import Radium from 'radium';
import styleUtils from './../styleUtils';
import { Link } from 'react-router-dom';
import { apiURL } from './../api';

// workaround, because <Link> cannot be styles with radiu,
var LinkRadium = Radium(Link);

class RecipePreview extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <LinkRadium to={String(this.props.id)} className="RecipePreview" style={styles.container}>
        {this.props.image && <div style={{ ...styles.image, backgroundImage: 'url(' + apiURL + this.props.image + ')' }}></div>}
        <div style={styles.details}>
          <h3>{this.props.name}</h3>
          <small style={styles.time}>{this.props.time} Minuten</small>
        </div>
      </LinkRadium>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(237, 237, 237)',
    borderRadius: '2px',
    [styleUtils.mediaQueries.mobile]: {
      backgroundColor: 'transparent',
      borderBottom: '1px solid rgb(173, 173, 173)'
    },
  },

  image: {
    borderTopRightRadius: '2px',
    borderTopLeftRadius: '2px',
    width: '100%',
    height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },

  details: {
    padding: '10px',
  },

  time: {
    display: 'block',
    textAlign: 'right'
  }
}

export default Radium(RecipePreview);
