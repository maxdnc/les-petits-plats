// /* eslint-disable prefer-const */
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import searchAlgorithm from "./services/searchAlgorithm.js";
import createAndAppendDropdown from "./utils/createAndAppendDropdown.js";
import rechercherRecettesParTag from "./services/tagAlgorithm.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

let recipesList = recipes;
let originalRecipesList = [...recipesList]; // Keep a copy of the original list
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

let selectedItems = [];

const onItemDeselected = (item) => {
  const index = selectedItems.indexOf(item);
  if (index !== -1) {
    selectedItems.splice(index, 1);
  }
};

createAndAppendDropdown(
  recipesList,
  "ingredients",
  "Ingrédients",
  filtersMenu,
  onItemDeselected,
  selectedItems,
);
createAndAppendDropdown(
  recipesList,
  "ustensils",
  "Ustensiles",
  filtersMenu,
  onItemDeselected,
  selectedItems,
);
createAndAppendDropdown(
  recipesList,
  "appliance",
  "Appareils",
  filtersMenu,
  onItemDeselected,
  selectedItems,
);
function updateList() {
  listRecipesSection.innerHTML = new ListCards(recipesList).render();
  numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;
}

searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value;

  if (searchValue.length >= 3) {
    const results = searchAlgorithm(searchValue, recipesList);

    if (results.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      listRecipesSection.innerHTML = new ListCards(results).render();
      numberOfRecipes.textContent = `${results.length} ${results.length <= 1 ? "recette" : "recettes"}`;
      recipesList = results; // update the filtered list with the search results
    }
  }
});

window.addEventListener("selectedItemsUpdated", (event) => {
  const updatedSelectedItems = event.detail;

  if (updatedSelectedItems.length === 0) {
    recipesList = originalRecipesList;
    updateList();
    return; // Return here to avoid further filtering
  }

  const recipeFilteredByTag = rechercherRecettesParTag(
    originalRecipesList,
    updatedSelectedItems,
  );

  recipesList = recipeFilteredByTag;
  updateList();
});
