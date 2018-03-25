import React, { Component } from 'react';
import Radium from 'radium';
import styleUtils from './../styleUtils'
import api from './../api';
import RecipePreview from './RecipePreview';

class RecipeGrid extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }

  componentWillMount() {
    api().get('recipes')
      .then(response => {
        // Sort function by last access time
        response.data.sort((a, b) => {
          if (a.lastAccess < b.lastAccess) {
            return 1;
          }
          if (a.lastAccess > b.lastAccess) {
            return -1;
          }
          return 0;
        })

        this.setState({
          recipes: response.data
        })
      })
      .catch(e => {
        console.error(e.response.data.error);
      });
  }

  render() {
    return (
      <div className="RecipeGrid" style={styles.container}>

        {Boolean(this.state.recipes.length == 0) && <p>No recipes found!</p>}

        {this.state.recipes.map(r => {
          return <RecipePreview
            name={r.name}
            image={r.image}
            time={r.time}
            id={r.id}
            key={r.id}/>
        })}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'grid',
    [styleUtils.mediaQueries.mobile]: {
      gridTemplateColumns: '1fr',
    },
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px'
  }
}

export default Radium(RecipeGrid);
