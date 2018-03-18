import React, { Component } from 'react';
import RecipeGrid from './RecipeGrid';
import FloatingActionButton from './FloatingActionButton';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="Home">
        <RecipeGrid/>
        <FloatingActionButton onClick={() => {this.props.history.push('create');}} type="create"/>
      </div>
    )
  }
}

export default Home;
