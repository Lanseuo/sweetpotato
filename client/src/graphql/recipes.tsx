import gql from 'graphql-tag'

export interface Recipe {
    id: string
    title: string
}

export interface Recipes {
    recipes: Recipe[]
}

export interface NewRecipe {
    title: string
}

export const RECIPES_QUERY = gql`
    query {
        recipes {
            id
            title
        }
    }
`

export const CREATE_RECIPE_MUTATION = gql`
    mutation CreateRecipe($recipe: NewRecipe!) {
        createRecipe(input: $recipe) {
            id
        }
    }
`