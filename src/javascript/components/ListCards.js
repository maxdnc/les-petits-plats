import CardRecipe from "./CardRecipe.js";

export default class ListCards {
  constructor(recipes) {
    this.recipes = recipes;
  }

  render() {
    return `
                <ul class="grid grid-cols-3 gap-12 pt-4 pb-24">
                        ${this.recipes.map((recipe) => `<li>${new CardRecipe(recipe).render()}</li>`).join("")}
                </ul>
        `;
  }
}
