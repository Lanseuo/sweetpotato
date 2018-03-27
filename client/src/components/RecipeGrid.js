import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import styleUtils from './../styleUtils'
import api from './../api';
import RecipePreview from './RecipePreview';
import Spinner from './Spinner'

class RecipeGrid extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      loading: true
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
          recipes: response.data,
          loading: false
        })
      })
      .catch(e => {
        this.setState({ loading: false })
        console.error(e.response.data.error);
      });
  }

  render() {
    let filteredRecipes = this.state.recipes.filter(r => {
      var s = this.props.search.toLowerCase()
      return r.name.toLowerCase().includes(s) || r.ingredients.map(i => i.ingredient).join(' ').toLowerCase().includes(s)
    })

    return (
      <div className="RecipeGrid" style={styles.container}>
        {this.state.loading && <Spinner/>}

        {Boolean(filteredRecipes.length === 0) && !this.state.loading && <p>No recipes found!</p>}

        <div style={styles.grid}>
          {filteredRecipes.map(r => {
            return <RecipePreview
              name={r.name}
              image={r.image}
              time={r.time}
              id={r.id}
              key={r.id}/>
          })}
        </div>
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'grid',
    [styleUtils.mediaQueries.mobile]: {
      gridTemplateColumns: '1fr',
    },
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px'
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.reducer.search
  }
}

export default connect(mapStateToProps)(Radium(RecipeGrid));
