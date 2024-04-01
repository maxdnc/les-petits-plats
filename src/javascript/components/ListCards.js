import CardRecipe from "./CardRecipe.js";

export default class ListCards {
  constructor(recipes) {
    this.recipes = recipes;
  }

  render() {
    return `
                <ul class="flex flex-wrap gap-12 py-4">
                        ${this.recipes.map((recipe) => `<li>${new CardRecipe(recipe).render()}</li>`).join("")}
                </ul>
        `;
  }
}
