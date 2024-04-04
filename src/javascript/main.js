/* eslint-disable prefer-const */
import DropdownItem from "./components/dropDown.js";
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import getUniqueValues from "./utils/getUniqueValues.js";
import searchAlgorithm from "./services/searchAlgorithm.js";
import createAndAppendDropdown from "./utils/createAndAppendDropdown.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");
const form = document.querySelector("#searchForm");

let recipesList = recipes;
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

let selectedItems = [];

const onItemDeselected = (item) => {
  const index = selectedItems.indexOf(item);
  if (index !== -1) {
    selectedItems.splice(index, 1);
  }
  console.log(selectedItems);
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = searchAlgorithm(searchInput.value, recipesList);
  listRecipesSection.innerHTML = new ListCards(results).render();
  numberOfRecipes.textContent = `${results.length} ${results.length <= 1 ? "recette" : "recettes"}`;
});
