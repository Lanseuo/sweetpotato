import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Recipe from './components/Recipe';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <main>
            <Switch>
              <Route path="/" exact strict component={Home}/>
              <Route path="/create" exact strict component={CreateRecipe}/>
              <Route path="/:permalink" exact strict component={Recipe}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
