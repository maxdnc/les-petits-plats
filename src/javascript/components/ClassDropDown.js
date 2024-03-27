export default class Dropdown {
  constructor(
    dropdownButtonId,
    dropdownMenuId,
    searchInputId,
    arrowDropDownId,
    deleteInputId,
  ) {
    this.dropdownButton = document.getElementById(dropdownButtonId);
    this.dropdownMenu = document.getElementById(dropdownMenuId);
    this.searchInput = document.getElementById(searchInputId);
    this.arrowDropDown = document.getElementById(arrowDropDownId);
    this.deleteInput = document.getElementById(deleteInputId);
    this.isOpen = false;

    this.dropdownButton.addEventListener("click", () => this.toggleDropdown());
    this.deleteInput.addEventListener("click", () => this.clearInput());
    this.searchInput.addEventListener("input", () => this.filterItems());
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.dropdownMenu.classList.toggle("hidden");
    this.arrowDropDown.classList.toggle("rotate-180");
    this.dropdownButton.classList.toggle("rounded-b-xl");
  }

  clearInput() {
    this.searchInput.value = "";
    const items = this.dropdownMenu.querySelectorAll("a");
    items.forEach((item) => {
      item.style.display = "block";
    });
  }

  filterItems() {
    const searchTerm = this.searchInput.value.toLowerCase();
    const items = this.dropdownMenu.querySelectorAll("a");

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}
