const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
const ingredientCount = (recipe) => Array.from({ length: 20 }, (_, i) => recipe[`strIngredient${i + 1}`]?.trim()).filter(Boolean).length

export function answerRecipeQuestion(question, recipes = []) {
    const query = normalize(question)
    if (!recipes.length) return { text: 'The recipe collection is not available yet. Please try again once the recipe cards appear.', recipes: [] }
    if (/\b(hi|hello|hey)\b/.test(query) && query.split(' ').length < 3) {
        return { text: 'Hello! I can list recipes, suggest one with fewer ingredients, or check a recipe name in this collection.', recipes: [] }
    }
    if (/\b(easy|easiest|simple|simplest)\b/.test(query)) {
        const candidates = recipes.filter((recipe) => ingredientCount(recipe) > 0)
        const easiest = [...candidates].sort((a, b) => ingredientCount(a) - ingredientCount(b))[0]
        return easiest
            ? { text: `Try ${easiest.strMeal}! It has ${ingredientCount(easiest)} listed ingredients. I use fewer ingredients as an estimate of simplicity; cooking time and technique may vary.`, recipes: [easiest] }
            : { text: 'There isn’t enough ingredient information to suggest an easy recipe yet.', recipes: [] }
    }
    if (/\b(list|lst|show|all|browse)\b/.test(query) && /\b(recipes?|recepies?|meals?|all)\b/.test(query)) {
        return { text: `Here are the ${recipes.length} recipes in the currently loaded collection:`, recipes }
    }
    const stopWords = new Set('is are there do you have has a an the any recipe recipes recepie recepies meal meals available present prest in this collection book please find search for me check of can tell if does exist contains contain'.split(' '))
    const terms = query.split(' ').filter((word) => word && !stopWords.has(word))
    const matches = terms.length ? recipes.filter((recipe) => {
        const name = normalize(recipe.strMeal)
        return terms.every((term) => name.includes(term))
    }) : []
    if (matches.length) return { text: `Found ${matches.length === 1 ? 'this recipe' : `${matches.length} matching recipes`} in your collection:`, recipes: matches }
    if (!terms.length) return { text: 'Which recipe would you like to find? Enter a dish name, or try “list recipes” or “suggest an easy recipe”.', recipes: [] }
    return { text: 'I couldn’t find a matching recipe in the currently loaded collection. Try a shorter dish name, or ask “list recipes”. I only search the recipes available in this app.', recipes: [] }
}
