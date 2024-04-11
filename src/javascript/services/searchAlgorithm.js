/* eslint-disable operator-linebreak */
export default function searchAlgorithm(searchValue, recipes) {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  return recipes.filter((recipe) => {
    const ingredients = recipe.ingredients
      .map((ingredient) => ingredient.ingredient.toLowerCase())
      .join(" ");

    return (
      recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||
      ingredients.includes(lowerCaseSearchValue)
    );
  });
}
