import gql from 'graphql-tag'

export interface Recipe {
    id: string
    title: string
}

export interface NewRecipe {
    title: string
}

export const GET_RECIPES_QUERY = gql`
    query {
        recipes {
            id
            title
        }
    }
`

export interface GetRecipesData {
    recipes: Recipe[]
}

export const GET_RECIPE_QUERY = gql`
    query Recipe($id: ID!) {
        recipe(id: $id) {
            id
            title
        }
    }
`

export interface GetRecipeData {
    recipe: Recipe
}

export const CREATE_RECIPE_MUTATION = gql`
    mutation CreateRecipe($recipe: NewRecipe!) {
        createRecipe(input: $recipe) {
            id
        }
    }
`