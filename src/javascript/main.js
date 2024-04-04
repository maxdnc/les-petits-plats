/* eslint-disable prefer-const */
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

searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value;

  if (searchValue.length >= 3) {
    const results = searchAlgorithm(searchValue, originalRecipesList);

    if (results.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      listRecipesSection.innerHTML = new ListCards(results).render();
      numberOfRecipes.textContent = `${results.length} ${results.length <= 1 ? "recette" : "recettes"}`;
      recipesList = results;
    }
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value;

  if (searchValue.length >= 3) {
    const results = searchAlgorithm(searchValue, originalRecipesList);

    if (results.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      listRecipesSection.innerHTML = new ListCards(results).render();
      numberOfRecipes.textContent = `${results.length} ${results.length <= 1 ? "recette" : "recettes"}`;
      recipesList = results;
    }
  }
});

window.addEventListener("selectedItemsUpdated", (event) => {
  const updatedSelectedItems = event.detail;

  if (updatedSelectedItems.length === 0) {
    listRecipesSection.innerHTML = new ListCards(originalRecipesList).render();
    numberOfRecipes.textContent = `${originalRecipesList.length} ${originalRecipesList.length <= 1 ? "recette" : "recettes"}`;
    return; // Return here to avoid further filtering
  }

  const recipeFilteredByTag = rechercherRecettesParTag(
    originalRecipesList,
    updatedSelectedItems,
  );

  listRecipesSection.innerHTML = new ListCards(recipeFilteredByTag).render();
  numberOfRecipes.textContent = `${recipeFilteredByTag.length} ${recipeFilteredByTag.length <= 1 ? "recette" : "recettes"}`;
  originalRecipesList = [...recipesList];
});
