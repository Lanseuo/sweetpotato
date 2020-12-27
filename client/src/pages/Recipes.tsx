import React from 'react'
import { useQuery } from 'react-apollo'
import styled from 'styled-components'
import { Recipes, RECIPES_QUERY } from '../graphql/recipes'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
`

const RecipePreview = styled.div`
    background: white;
`

const Recipes = () => {
    const { loading, error, data } = useQuery<Recipes>(RECIPES_QUERY)

    return (
        <section>
            <h2>Recipes</h2>
            {loading && <p>Loading ...</p>}
            {error && <p>Error ...</p>}

            {data && (
                <Grid>
                    {data.recipes.map(recipe => (
                        <RecipePreview>
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