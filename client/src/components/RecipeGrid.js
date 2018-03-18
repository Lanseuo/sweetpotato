import React, { Component } from 'react';
import RecipePreview from './RecipePreview'

class RecipeGrid extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 1
        },
        {
          'name': 'Salat',
          'image': 'https://ellerepublic.de/wp-content/uploads/2016/08/Kichererbsen-Tomaten-Salat-4.jpg',
          'permalink': 'salat',
          'time': 20,
          'id': 2
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 3
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 4
        },
        {
          'name': 'Süßkartoffeln',
          'image': 'https://aboyfromstoneage.at/wp-content/uploads/2013/12/suesskartoffel-hasselback-style.png',
          'permalink': 'suesskartoffeln',
          'time': 20,
          'id': 5
        }
      ]
    }
  }

  render() {
    return (
      <div className="RecipeGrid" style={styles.container}>

        {this.state.recipes.map(r => {
          return <RecipePreview name={r.name} image={r.image} time={r.time} permalink={r.permalink} key={r.id}/>
        })}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px'
  }
}

export default RecipeGrid;
