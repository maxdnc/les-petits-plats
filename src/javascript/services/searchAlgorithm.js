/* eslint-disable operator-linebreak */
export default function searchAlgorithm(searchValue, recipes) {
  const results = [];

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i];
    let ingredients = "";

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      ingredients += `${recipe.ingredients[j].ingredient} `;
    }
    ingredients = ingredients.trim();

    if (
      recipe.name.includes(searchValue) ||
      recipe.description.includes(searchValue) ||
      ingredients.includes(searchValue)
    ) {
      results.push(recipe);
    }
  }

  return results;
}
