import React, { Component } from 'react';
import Radium from 'radium';
import styleUtils from './../styleUtils';
import FloatingActionButton from './FloatingActionButton';
import api, { apiURL } from './../api'
import Spinner from './Spinner'

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      image: null,
      time: null,
      serves: null,
      ingredients: [],
      instructions: [],
      loading: true,
    }
  }

  componentWillMount() {
    let id = this.props.match.params.id;

    api().get('recipes/' + id)
      .then(response => {
        this.setState({
          name: response.data.name,
          image: response.data.image,
          time: response.data.time,
          serves: response.data.serves,
          ingredients: response.data.ingredients,
          instructions: response.data.instructions
        })
        this.setState({ loading: false })
      })
      .catch(e => {
        this.setState({ loading: false })
        console.error(e.response.data.error);
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="Recipe">
          <Spinner/>
        </div>
      )
    }

    return (
      <div className="Recipe">
        {/* Random number, otherwise site doesn't use new image, if it was updated */}
        {this.state.image && <img
          src={apiURL + this.state.image + '?_=' + Math.floor((Math.random() * 100) + 1) }
          alt={this.state.name}
          style={styles.image}/>}
        <h1 style={styles.heading}>{this.state.name}</h1>
        <p style={styles.time}>{this.state.time} Minuten / {this.state.serves} Portionen</p>

        <h2>Zutaten</h2>
        <table>
          {this.state.ingredients.map(i => (
            <tr>
              <td style={styles.firstColumn}>{i.amount}</td>
              <td>{i.ingredient}</td>
            </tr>
          ))}
        </table>

        <h2>Zubereitung</h2>
        <table style={styles.instructionsTable}>
          {this.state.instructions.map((i, index) => (
            <tr>
              <td style={styles.firstColumn}>{index + 1}.</td>
              <td style={styles.instructionText}>{i}</td>
            </tr>
          ))}
        </table>

        <FloatingActionButton onClick={() => this.props.history.push(this.props.match.params.id + '/update')} type="edit" height={0}/>
      </div>
    )
  }
}

const styles = {
  image: {
    maxWidth: '50%',
    margin: '0 auto',
    display: 'block',
    [styleUtils.mediaQueries.mobile]: {
      maxWidth: '100%'
    }
  },

  heading: {
    textAlign: 'center'
  },

  time: {
    textAlign: 'center'
  },

  firstColumn: {
    verticalAlign: 'top',
    lineHeight: '30px',
    paddingRight: '15px',
  },

  instructionsTable: {
    borderCollapse: 'separate',
    borderSpacing: '0 10px'
  },

  instructionText: {
    lineHeight: '30px'
  }
}

export default Radium(Recipe);
