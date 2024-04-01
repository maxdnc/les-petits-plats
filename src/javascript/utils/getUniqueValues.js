/* eslint-disable function-paren-newline */
export default function getUniqueValues(recipes, property) {
  let allValues;

  if (property === "ingredients") {
    allValues = recipes
      .map((recipe) =>
        recipe[property].map((ingredient) =>
          ingredient.ingredient.toLowerCase(),
        ),
      )
      .flat();
  } else if (property === "ustensils") {
    allValues = recipes
      .map((recipe) => recipe[property].map((utensil) => utensil.toLowerCase()))
      .flat();
  } else {
    allValues = recipes
      .map((recipe) => String(recipe[property]).toLowerCase())
      .flat();
  }

  return [...new Set(allValues)];
}
