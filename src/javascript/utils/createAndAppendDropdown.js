import DropdownItem from "../components/dropDown.js";
import getUniqueValues from "./getUniqueValues.js";

export default function createAndAppendDropdown(
  recipesList,
  type,
  buttonText,
  filtersMenu,
  onItemDeselected,
  selectedItems,
) {
  const uniqueValues = getUniqueValues(recipesList, type);
  const dropdown = new DropdownItem(
    buttonText,
    uniqueValues,
    onItemDeselected,
    selectedItems,
  );
  filtersMenu.appendChild(dropdown.createDropdown());
}
