// /* eslint-disable prefer-const */
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import searchAlgorithm from "./services/searchAlgorithm.js";
import rechercherRecettesParTag from "./services/tagAlgorithm.js";
import createAndAppendAllDropdowns from "./utils/createAndAppendDropdown.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

let recipesList = recipes;
const originalRecipesList = [...recipesList];
// Keep a copy of the original list
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

let selectedItems = [];

const onItemDeselected = (item) => {
  const index = selectedItems.indexOf(item);
  if (index !== -1) {
    selectedItems.splice(index, 1);
  }
};

createAndAppendAllDropdowns(
  recipesList,
  filtersMenu,
  onItemDeselected,
  selectedItems,
);

function updateList(data) {
  listRecipesSection.innerHTML = new ListCards(data).render();
  numberOfRecipes.textContent = `${data.length} ${data.length <= 1 ? "recette" : "recettes"}`;
  filtersMenu.innerHTML = "";

  createAndAppendAllDropdowns(
    data,
    filtersMenu,
    onItemDeselected,
    selectedItems,
  );
}
let searchValue = "";

searchInput.addEventListener("input", (event) => {
  searchValue = event.target.value;

  if (searchValue.length >= 3) {
    const results = searchAlgorithm(searchValue, recipesList);

    if (results.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      updateList(results);
      recipesList = results;
    }
  }
});

window.addEventListener("selectedItemsUpdated", (event) => {
  const updatedSelectedItems = event.detail;

  if (updatedSelectedItems.length === 0) {
    recipesList = originalRecipesList;
  } else {
    recipesList = rechercherRecettesParTag(
      originalRecipesList,
      updatedSelectedItems,
    );
  }

  if (searchValue.length >= 3) {
    recipesList = searchAlgorithm(searchValue, recipesList);
  }

  updateList(recipesList);
  console.log(recipesList);
});
