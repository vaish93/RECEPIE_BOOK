import { useContext } from "react"
import recepieContext from "../context/RecepieContext.js"
import { Link, useParams } from "react-router-dom"
import './RecepieDetailsPage.css'

export default function RecepieDetails() {
    const { id } = useParams()
    const recepies = useContext(recepieContext)
    const recipe = recepies?.find((item) => item.idMeal === id)

    if (!recipe) {
        return (
            <main className="recipe-details">
                <div className="recipe-details__container">
                    <Link className="recipe-details__back" to="/">← Back to recipes</Link>
                    <section className="recipe-details__panel" role="status">
                        <h1>{recepies?.length ? 'Recipe not found' : 'Waiting for your recipe…'}</h1>
                        <p>{recepies?.length ? 'Explore the collection to find something delicious.' : 'If it doesn’t appear, return to the collection and try again.'}</p>
                    </section>
                </div>
            </main>
        )
    }

    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const name = recipe[`strIngredient${i}`]?.trim()
        if (name) ingredients.push({ name, measure: recipe[`strMeasure${i}`]?.trim() })
    }
    const instructions = (recipe.strInstructions || '').split(/\r?\n+/).map((text) => text.trim()).filter(Boolean)

    return (
        <main className="recipe-details">
            <div className="recipe-details__container">
                <Link className="recipe-details__back" to="/">← Back to recipes</Link>
                <section className="recipe-details__hero" aria-labelledby="recipe-title">
                    <img className="recipe-details__photo" src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <div className="recipe-details__intro">
                        <p className="recipe-details__eyebrow">A little joy, made from scratch</p>
                        <h1 id="recipe-title">{recipe.strMeal}</h1>
                        <div className="recipe-details__badges">
                            {recipe.strArea && <span>{recipe.strArea} cuisine</span>}
                            {recipe.strCategory && <span>{recipe.strCategory}</span>}
                            <span>{ingredients.length} ingredients</span>
                        </div>
                        <p className="recipe-details__welcome">Gather your ingredients, make yourself at home, and let’s get cooking.</p>
                        <div className="recipe-details__actions">
                            <button type="button" className="recipe-details__edit">Edit recipe</button>
                            <button type="button" className="recipe-details__delete">Delete recipe</button>
                        </div>
                    </div>
                </section>

                <div className="recipe-details__body">
                    <section className="recipe-details__panel recipe-details__ingredients" aria-labelledby="ingredients-title">
                        <p className="recipe-details__eyebrow">The essentials</p>
                        <h2 id="ingredients-title">Ingredients</h2>
                        <ul>
                            {ingredients.map(({ name, measure }, index) => (
                                <li key={index}><span>{name}</span><span className="recipe-details__measure">{measure}</span></li>
                            ))}
                        </ul>
                    </section>
                    <section className="recipe-details__panel" aria-labelledby="instructions-title">
                        <p className="recipe-details__eyebrow">Bring it all together</p>
                        <h2 id="instructions-title">In the kitchen</h2>
                        <div className="recipe-details__instructions">
                            {instructions.length ? instructions.map((text, index) => <p key={index}>{text}</p>) : <p>Cooking instructions are not available for this recipe yet.</p>}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
