import React from 'react'
import NavBar from './components/NavBar'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

const client = new ApolloClient({
    uri: 'http://localhost:8090/query'
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <NavBar />

                    <Switch>
                        <Redirect from="/" exact to="/recipes" />
                        <Route path="/recipes" exact component={Recipes} />
                        <Route path="/recipes/create" exact component={CreateRecipe} />
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
