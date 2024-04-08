import DropdownItem from "../components/dropDown.js";
import getUniqueValues from "./getUniqueValues.js";

function createAndAppendDropdown(
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

export default function createAndAppendAllDropdowns(
  recipesList,
  filtersMenu,
  onItemDeselected,
  selectedItems,
) {
  const dropdownData = [
    { type: "ingredients", buttonText: "Ingrédients" },
    { type: "ustensils", buttonText: "Ustensiles" },
    { type: "appliance", buttonText: "Appareils" },
  ];

  dropdownData.forEach(({ type, buttonText }) => {
    createAndAppendDropdown(
      recipesList,
      type,
      buttonText,
      filtersMenu,
      onItemDeselected,
      selectedItems,
    );
  });
}
