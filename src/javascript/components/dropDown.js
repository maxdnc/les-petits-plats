/* eslint-disable operator-linebreak */
import SelectedFilter from "./SelectedFilter.js";

export default class DropdownItem {
  constructor(buttonText, items) {
    this.buttonText = buttonText;
    this.items = items;
    this.isOpen = false;
    this.dropdownMenu = null;
    this.arrowDropDown = null;
    this.dropdownButton = null;
    this.searchInput = null;
    this.deleteButton = null;
    this.selectedItems = [];

    this.toggleDropdown = () => {
      this.isOpen = !this.isOpen;
      this.dropdownMenu.classList.toggle("hidden");
      this.arrowDropDown.classList.toggle("rotate-180");
      this.dropdownButton.classList.toggle("rounded-b-xl");
    };

    this.clearInput = () => {
      this.searchInput.value = "";
      const dropDownItems = this.dropdownMenu.querySelectorAll("a");
      dropDownItems.forEach((item) => {
        item.style.display = "block";
      });
    };

    this.filterItems = () => {
      const searchTerm = this.searchInput.value.toLowerCase();
      const dropDownItemsFiltered = this.dropdownMenu.querySelectorAll("a");

      dropDownItemsFiltered.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    };
  }

  createDropdown() {
    // Create main div
    const mainDiv = document.createElement("div");
    mainDiv.className = "flex items-center justify-center";

    // Create group div
    const groupDiv = document.createElement("div");
    groupDiv.className = "group relative";

    // Create button
    const button = document.createElement("button");
    // eslint-disable-line no-console
    button.className =
      "inline-flex w-full content-center justify-center gap-16 rounded-b-xl rounded-t-xl bg-white p-4 text-sm font-medium text-blackPrimary focus:outline-none";
    // Create span for button text
    const spanText = document.createElement("span");
    spanText.textContent = this.buttonText;

    // Create span for SVG
    const spanSvg = document.createElement("span");
    spanSvg.classList.add("self-center");
    spanSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none" class="arrowButton"> <path d="M1 1L7.5 7L14 1" stroke="#1B1B1B" stroke-linecap="round" /> </svg>`;

    // Append spans to button
    button.appendChild(spanText);
    button.appendChild(spanSvg);
    groupDiv.appendChild(button);

    // Create contenair input div
    const contenairInput = document.createElement("div");
    contenairInput.className = "px-4 pb-4";

    // Create relative div
    const relativeDiv = document.createElement("div");
    relativeDiv.className =
      "relative rounded border-2 border-gray-300 text-gray-600";

    // Create input
    const input = document.createElement("input");
    input.className = "block w-2/3  px-2 py-1 text-sm focus:outline-none";
    input.type = "text";
    input.autocomplete = "off";

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "absolute right-7 top-1/2 -translate-y-1/2";
    deleteButton.innerHTML = `
  <span class="sr-only">Delete input</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7" stroke="#7A7A7A" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

    // Create search button
    const searchButton = document.createElement("button");
    searchButton.className = "absolute right-2 top-1/2 -translate-y-1/2";
    searchButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5" />
    <line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A" stroke-width="0.5" />
  </svg>
`;
    // Append elements to relative div
    relativeDiv.appendChild(input);
    relativeDiv.appendChild(deleteButton);
    relativeDiv.appendChild(searchButton);
    // Append relative div to main div
    contenairInput.appendChild(relativeDiv);

    // Create dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.id = "dropdown-menu";
    dropdownMenu.className =
      "absolute left-0 right-0 z-10 hidden overflow-hidden rounded-b-xl bg-white max-h-60 overflow-y-auto ";

    // Add items to dropdown menu
    dropdownMenu.appendChild(contenairInput);
    this.items.forEach((item) => {
      const a = document.createElement("a");
      a.href = "#";
      a.className =
        "block cursor-pointer px-4 py-2 text-gray-700 hover:bg-yellowSecondary active:bg-blue-100 capitalize";
      a.textContent = item;
      dropdownMenu.appendChild(a);

      a.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default action

        // Check if the item is already selected
        if (!this.selectedItems.includes(item)) {
          // If the item is not already selected, select it

          // Create a new SelectedFilter
          const filter = new SelectedFilter(item, (text) => {
            // Remove the item from the selected items
            this.selectedItems = this.selectedItems.filter(
              (selectedItem) => selectedItem !== text,
            );
          });
          const filterElement = filter.render();

          // Append the filter element to the DOM
          const container = document.querySelector("#selectedFilter");
          container.appendChild(filterElement);

          // Add the item to the selected items
          this.selectedItems.push(item);
        }

        this.toggleDropdown();
      });
    });

    groupDiv.appendChild(dropdownMenu);
    mainDiv.appendChild(groupDiv);

    // Assign elements to properties
    this.dropdownMenu = dropdownMenu;
    this.arrowDropDown = spanSvg;
    this.dropdownButton = button;
    this.searchInput = input;
    this.deleteButton = deleteButton;

    // Add event listeners
    this.dropdownButton.addEventListener("click", this.toggleDropdown);
    this.deleteButton.addEventListener("click", this.clearInput);
    this.searchInput.addEventListener("input", this.filterItems);

    return mainDiv;
  }
}
