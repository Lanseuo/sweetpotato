import { useState } from "react"
import { useMutation } from "react-apollo"
import { CREATE_RECIPE_MUTATION, Recipe, NewRecipe } from "../graphql/recipes"


const CreateRecipe = () => {
    const [title, setTitle] = useState('')

    const [createRecipe, { loading, error, data }] = useMutation<{ createRecipe: Recipe }, { recipe: NewRecipe }>(
        CREATE_RECIPE_MUTATION,
        {
            variables: {
                recipe: { title }
            },
            onCompleted: data => {
                console.log(data.createRecipe.id);
            }
        }
    )

    return (
        <section>
            <h2>Create recipe</h2>
            {loading && <p>Loading ...</p>}
            {error && <p>Error ...</p>}

            <form>
                <p>
                    <label>Titel</label>
                    <input name="title" onChange={e => setTitle(e.target.value)} />
                </p>
                <button onClick={e => { e.preventDefault(); createRecipe() }}>Add</button>
            </form>
        </section >
    )
}

export default CreateRecipe