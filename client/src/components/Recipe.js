import React, { Component } from 'react';
import FloatingActionButton from './FloatingActionButton';


class Recipe extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  fetchRecipe() {
    let permalink = this.props.match.params.permalink;

    return {
      name: permalink.slice(0, 1).toUpperCase() + permalink.slice(1).toLowerCase(),
      image: 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
      time: 20,
      ingredients: [
        { amount: '1 TL', ingredient: 'Chiasamen' },
        { amount: '100g', ingredient: 'Sojadrink' },
        { amount: '1 Msp', ingredient: 'Zimt' }
      ],
      instructions: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet, est neque quis voluptates magnam.'
      ]
    }
  }

  render() {
    var recipe = this.fetchRecipe();

    return (
      <div className="Recipe">
        <img src={recipe.image} alt={recipe.name} style={styles.image}/>
        <h1 style={styles.heading}>{recipe.name}</h1>
        <p style={styles.time}>{recipe.time} Minuten</p>

        <h2>Zutaten</h2>
        <table>
          {recipe.ingredients.map(i => (
            <tr>
              <td style={styles.firstColumn}>{i.amount}</td>
              <td>{i.ingredient}</td>
            </tr>
          ))}
        </table>

        <h2>Zubereitung</h2>
        <table style={styles.instructionsTable}>
          {recipe.instructions.map((i, index) => (
            <tr>
              <td style={styles.firstColumn}>{index + 1}.</td>
              <td style={styles.instructionText}>{i}</td>
            </tr>
          ))}
        </table>

        <FloatingActionButton type="edit"/>
      </div>
    )
  }
}

const styles = {
  image: {
    maxWidth: '50%',
    margin: '0 auto',
    display: 'block'
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

export default Recipe;
