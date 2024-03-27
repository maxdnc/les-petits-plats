// JavaScript to toggle the dropdown
const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const searchInput = document.getElementById("search-input");
const arrowDropDown = document.getElementById("arrow-DropDown");
const deleteInput = document.getElementById("delete-input");
let isOpen = false; // Set to true to open the dropdown by default
// Add event listener to close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (isOpen && !dropdownButton.contains(event.target)) {
    toggleDropdown();
    rotateArrow();
    function toggleDropdown() {
      isOpen = !isOpen;
      dropdownMenu.classList.toggle("hidden");
      dropdownButton.classList.toggle("rounded-b-xl");
    }

    // Add event listener to close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (isOpen && !dropdownButton.contains(event.target)) {
        toggleDropdown();
        rotateArrow();
      }
    });
  }
});

// Function to toggle the dropdown state
function toggleDropdown() {
  isOpen = !isOpen;
  dropdownMenu.classList.toggle("hidden");
}
function rotateArrow() {
  arrowDropDown.classList.toggle("rotate-180");
}

function clearInput() {
  searchInput.value = "";
  const items = dropdownMenu.querySelectorAll("a");
  items.forEach((item) => {
    item.style.display = "block";
  });
}

dropdownButton.addEventListener("click", () => {
  toggleDropdown();
  rotateArrow();
  dropdownButton.classList.toggle("rounded-b-xl");
});

deleteInput.addEventListener("click", () => {
  clearInput();
});

// Add event listener to filter items based on input
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const items = dropdownMenu.querySelectorAll("a");

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
