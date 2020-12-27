import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'

const client = new ApolloClient({
    uri: 'http://localhost:8090/query'
})

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <NavBar />
                {/* <Recipes /> */}
                <CreateRecipe />
            </div>
        </ApolloProvider>
    );
}

export default App;
