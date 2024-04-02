import DropdownItem from "../components/dropDown.js";
import getUniqueValues from "./getUniqueValues.js";

export default function createAndAppendDropdown(
  recipesList,
  property,
  displayName,
  menu,
) {
  const uniqueValues = getUniqueValues(recipesList, property);
  const dropdownItem = new DropdownItem(displayName, uniqueValues);
  const dropdownElement = dropdownItem.createDropdown();
  menu.appendChild(dropdownElement);
}
