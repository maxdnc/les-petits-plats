import DropdownItem from "./components/dropDown.js";
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import getUniqueValues from "./utils/getUniqueValues.js";
import searchAlgorithm from "./services/searchAlgorithm.js";
import createAndAppendDropdown from "./utils/createAndAppendDropdown.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");

const recipesList = recipes;
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

createAndAppendDropdown(recipesList, "ustensils", "Ustensiles", filtersMenu);
createAndAppendDropdown(recipesList, "appliance", "Appareils", filtersMenu);
createAndAppendDropdown(recipesList, "ingredients", "Ingrédients", filtersMenu);

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchAlgorithm(searchInput.value);
});
