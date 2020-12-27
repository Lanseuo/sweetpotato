import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"
import { CREATE_RECIPE_MUTATION, Recipe, NewRecipe } from "../graphql/recipes"
import { Button, FormElement } from "../style"


const CreateRecipe = () => {
    let history = useHistory()
    const [title, setTitle] = useState('')

    const [createRecipe, { loading, error }] = useMutation<{ createRecipe: Recipe }, { recipe: NewRecipe }>(
        CREATE_RECIPE_MUTATION,
        {
            variables: {
                recipe: { title }
            },
            onCompleted: data => {
                history.push(`/recipes/${data.createRecipe.id}`)
            }
        }
    )

    return (
        <section>
            <h2>Create recipe</h2>
            {loading && <p>Loading ...</p>}
            {error && <p>Error ...</p>}

            <form>
                <FormElement>
                    <label>Titel</label>
                    <input name="title" placeholder="Title of the recipe" onChange={e => setTitle(e.target.value)} />
                </FormElement>
                <Button onClick={e => { e.preventDefault(); createRecipe() }}>Add</Button>
            </form>
        </section >
    )
}

export default CreateRecipe