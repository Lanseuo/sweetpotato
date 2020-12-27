import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GET_RECIPES_QUERY, GetRecipesData } from '../graphql/recipes'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
`

const RecipePreview = styled(Link)`
    background: white;
    color: black;
`

const Recipes = () => {
    const { loading, error, data } = useQuery<GetRecipesData>(GET_RECIPES_QUERY)

    return (
        <section>
            <h2>Recipes</h2>
            {loading && <p>Loading ...</p>}
            {error && <p>Error ...</p>}

            {data && (
                <Grid>
                    {data.recipes.map(recipe => (
                        <RecipePreview to={`/recipes/${recipe.id}`}>
                            <p>{recipe.id}</p>
                            <p>{recipe.title}</p>
                        </RecipePreview>
                    ))}
                </Grid>
            )}
        </section>
    )
}

export default Recipes