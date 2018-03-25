import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Recipe from './components/Recipe';
import UpdateRecipe from './components/UpdateRecipe';

class App extends Component {
  render() {
    return (
      <StyleRoot>
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <main>
            <Switch>
              <Route path="/" exact strict component={Home}/>
              <Route path="/create" exact strict component={CreateRecipe}/>
              <Route path="/:id/update" exact strict component={UpdateRecipe}/>
              <Route path="/:id" exact strict component={Recipe}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
      </StyleRoot>
    );
  }
}

export default App;
