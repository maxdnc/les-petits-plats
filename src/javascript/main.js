import Dropdown from "./components/ClassDropDown.js";
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const recipesList = recipes;
console.log(recipesList);

listRecipesSection.innerHTML = new ListCards(recipesList).render();

const myDropdown = new Dropdown(
  "dropdown-button",
  "dropdown-menu",
  "search-input",
  "arrow-DropDown",
  "delete-input",
);
