import DropdownItem from "./components/dropDown.js";
import ListCards from "./components/ListCards.js";
import recipes from "../api/recipes.js";
import getUniqueValues from "./utils/getUniqueValues.js";

const listRecipesSection = document.querySelector("#ListRecipes");
const filtersMenu = document.querySelector("#filtersMenu");
const numberOfRecipes = document.querySelector("#numberOfRecipes");

const recipesList = recipes;
numberOfRecipes.textContent = `${recipesList.length} ${recipesList.length <= 1 ? "recette" : "recettes"}`;

listRecipesSection.innerHTML = new ListCards(recipesList).render();

const allUstensils = getUniqueValues(recipesList, "ustensils");
const allappliance = getUniqueValues(recipesList, "appliance");
const allIngredients = getUniqueValues(recipesList, "ingredients");

const dropdownIngredient = new DropdownItem("Ingrédients", allIngredients);
const dropdownAppliance = new DropdownItem("Appareils", allappliance);
const dropdownUstensils = new DropdownItem("Ustensiles", allUstensils);

const dropdownElement = dropdownIngredient.createDropdown();
const dropdownElement2 = dropdownAppliance.createDropdown();
const dropdownElement3 = dropdownUstensils.createDropdown();
filtersMenu.appendChild(dropdownElement);
filtersMenu.appendChild(dropdownElement2);
filtersMenu.appendChild(dropdownElement3);
