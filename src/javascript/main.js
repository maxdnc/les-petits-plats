// /* eslint-disable prefer-const */
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import searchAlgorithm from "./services/searchAlgorithm.js";
import rechercherRecettesParTag from "./services/tagAlgorithm.js";
import createAndAppendAllDropdowns from "./utils/createAndAppendDropdown.js";
import sanitizeInput from "./utils/sanitizeInput.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");
const deleteInput = document.querySelector("#deleteInput");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

let recipesList = recipes;
const originalRecipesList = [...recipesList];
// Keep a copy of the original list
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

const selectedItems = [];

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
let updatedSelectedItems = [];

searchInput.addEventListener("input", (event) => {
  searchValue = event.target.value;
  searchValue = sanitizeInput(searchValue);

  // Filtrer les recettes en fonction des tags sélectionnés
  const filteredRecipes = rechercherRecettesParTag(
    originalRecipesList,
    updatedSelectedItems,
  );

  if (searchValue.length >= 3) {
    const resultFromSearch = searchAlgorithm(searchValue, filteredRecipes);
    deleteInput.classList.remove("hidden");

    if (resultFromSearch.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      updateList(resultFromSearch);
      recipesList = resultFromSearch;
    }
  } else {
    deleteInput.classList.add("hidden");
    updateList(filteredRecipes);
    recipesList = filteredRecipes;
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchValue = sanitizeInput(searchInput.value);

  if (searchValue.length >= 3) {
    const resultFromSearch = searchAlgorithm(searchValue, recipesList);
    deleteInput.classList.remove("hidden");

    if (resultFromSearch.length === 0) {
      listRecipesSection.innerHTML = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      numberOfRecipes.textContent = "0 recettes";
    } else {
      updateList(resultFromSearch);
      recipesList = resultFromSearch;
    }
  } else {
    deleteInput.classList.add("hidden");
    recipesList = rechercherRecettesParTag(
      originalRecipesList,
      updatedSelectedItems,
    );
    updateList(recipesList);
  }
});

deleteInput.addEventListener("click", () => {
  searchInput.value = "";
  searchValue = "";
  deleteInput.classList.add("hidden");

  // If there are selected tags, filter the recipesList by these tags
  if (selectedItems.length > 0) {
    recipesList = rechercherRecettesParTag(originalRecipesList, selectedItems);
  } else {
    // If there are no selected tags, reset the recipesList to its original state
    recipesList = originalRecipesList;
  }

  // Update the list
  updateList(recipesList);
});

window.addEventListener("selectedItemsUpdated", (event) => {
  updatedSelectedItems = event.detail;

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
