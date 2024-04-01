export default class CardRecipe {
  constructor(recipe) {
    this.time = recipe.time;
    this.title = recipe.name;
    this.imgSrc = recipe.image;
    this.altText = recipe.name;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;

    this.renderIngredient = (ingredient) => `
    <li class="flex flex-col text-sm">
      <span>${ingredient.ingredient}</span>
      <span class="text-darkGray">${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span>
    </li>
  `;
  }

  render() {
    return `
        <div class="relative h-[731px] w-[380px] overflow-hidden rounded-[21px] bg-white">
          <div class="absolute right-5 top-5 inline-flex content-center justify-center rounded-2xl bg-yellowSecondary px-[15px] py-[5px]">
            <span class="text-sm">${this.time}min</span>
          </div>
          <div>
            <img src="./src/assets/images/recettes/${this.imgSrc}" alt="${this.altText}" class="h-[253px] w-full object-cover" />
          </div>
          <div class="flex flex-col px-6 py-8">
            <h2 class="mb-8 font-anton text-lg">${this.title}</h2>
            <div class="mb-8 flex flex-col gap-4">
              <h3 class="text-xs font-bold uppercase tracking-[1.08px] text-darkGray">Recette</h3>
              <p class="text-sm">${this.description.substring(0, 150)}</p>
            </div>
            <div class="flex flex-col gap-4">
              <h3 class="text-xs font-bold uppercase tracking-[1.08px] text-darkGray">Ingrédients</h3>
              <ul class="grid grid-flow-row grid-cols-2 gap-5">
                ${this.ingredients.map(this.renderIngredient).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
  }
}
