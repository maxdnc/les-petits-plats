/* eslint-disable operator-linebreak */

export default class SelectedFilter {
  constructor(text, onDelete, aElement) {
    this.text = text;
    this.onDelete = onDelete;
    this.aElement = aElement;
  }

  render() {
    // Create elements
    const div = document.createElement("div");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const srOnlySpan = document.createElement("span");
    const svgSpan = document.createElement("span");

    const id = crypto.randomUUID();
    div.setAttribute("id", id);
    // Set attributes and content

    div.className =
      "inline-flex items-center justify-center gap-14 rounded-[11px] bg-yellowSecondary px-4 py-2";
    span.className = "text-sm capitalize";
    span.textContent = this.text;
    button.className = "px-1 py-3";
    srOnlySpan.className = "sr-only";
    srOnlySpan.textContent = "delete filter";
    svgSpan.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
          <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

    // Add event listener
    button.addEventListener("click", () => {
      div.remove();
      this.onDelete(this.text);
      this.aElement.classList.remove("bg-yellowSecondary", "font-bold");
      this.aElement.textContent = this.text;
    });

    // Build element hierarchy
    button.appendChild(srOnlySpan);
    button.appendChild(svgSpan);
    div.appendChild(span);
    div.appendChild(button);

    return div;
  }
}
