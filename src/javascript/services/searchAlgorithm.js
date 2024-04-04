/* eslint-disable operator-linebreak */
export default function searchAlgorithm(searchValue, recipes) {
  const results = [];
  const lowerCaseSearchValue = searchValue.toLowerCase();

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i];
    let ingredients = "";

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      ingredients += `${recipe.ingredients[j].ingredient} `;
    }
    ingredients = ingredients.trim().toLowerCase();

    if (
      recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||
      ingredients.includes(lowerCaseSearchValue)
    ) {
      results.push(recipe);
    }
  }

  return results;
}
