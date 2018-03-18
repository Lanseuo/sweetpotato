import React, { Component } from 'react';
import axios from 'axios';
import RecipePreview from './RecipePreview';

class RecipeGrid extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:5000/recipes')
      .then(response => {
        this.setState({
          recipes: response.data
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="RecipeGrid" style={styles.container}>

        {this.state.recipes.map(r => {
          return <RecipePreview name={r.name} image={r.image} time={r.time} id={r.id} key={r.id}/>
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
