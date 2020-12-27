import React from 'react'
import { useQuery } from 'react-apollo'
import { useParams } from "react-router-dom"
import { GET_RECIPE_QUERY, GetRecipeData } from '../graphql/recipes'

const Recipe = () => {
    const params = useParams()

    const { loading, error, data } = useQuery<GetRecipeData, { id: string }>(GET_RECIPE_QUERY, {
        variables: {
            id: (params as any)['id'] as string
        }
    })


    console.log(data);
    return (
        <section>
            {loading && <p>Loading ...</p>}
            {error && <p>Error ...</p>}

            {data && (
                <h2>Rezept: {data.recipe.title}</h2>
            )}
        </section>
    )
}

export default Recipe