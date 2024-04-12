/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
export default function rechercherRecettesParTag(recipes, tags) {
  if (tags.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    // Vérifier si tous les tags sont présents dans les ingrédients, ustensiles ou appareil de la recette
    return tags.every((tag) => {
      // Vérifier si le tag est présent dans les ingrédients
      const ingredientPresent = recipe.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase() === tag.toLowerCase(),
      );
      // Vérifier si le tag est présent dans les ustensiles
      const ustensilPresent = recipe.ustensils.some(
        (ustensil) => ustensil.toLowerCase() === tag.toLowerCase(),
      );
      // Vérifier si le tag est présent dans l'appareil
      const appliancePresent =
        recipe.appliance.toLowerCase() === tag.toLowerCase();
      return ingredientPresent || ustensilPresent || appliancePresent;
    });
  });
}
