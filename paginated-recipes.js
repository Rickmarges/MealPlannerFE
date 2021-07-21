/**
 * INPUT:
 * <paginated-recipes size="10" .recipes=${[...]}>
 * 
 * ----
 * OUTPUT:
 * 
 *  <div id="recipe-result">
 *    <div class="paginated-container">
 *      <div class="pages">
 *          <button class="btn btn-info">1</button> recipes/10
 *      </div>
 *    </div>
 *    <div class="page"> x recipes/10
 *      <div class="recipe"></div> x10
 *    </div>
 *  </div>
 */
class PaginatedRecipes extends HTMLElement {
    get size() {
        return this.getAttribute('size');
    }

    set size(value) {
        this.setAttribute('size', value);
    }

    get recipes() {
        return this._recipes;
    }

    set recipes(value) {
        this._recipes = value;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    recipeTemplate(recipe) {
        return `
        <div class="recipe">
          <div><img src="${recipe.picture}"></div>
          <div class="recipe__content">
              <h4 class="recipe__title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
              
                <div class="nutrition-values-per-serving">
                    Carbs: ${recipe.carbsPerServing.toFixed(2)} gr
                    <text class="nutrition-values-recipe">|</text>
                    Net Carbs: ${recipe.netCarbsPerServing.toFixed(2)} gr
                    <text class="nutrition-values-recipe">|</text>
                    Fats: ${recipe.fatsPerServing.toFixed(2)} gr
                    <text class="nutrition-values-recipe">|</text>
                    Protein: ${recipe.proteinPerServing.toFixed(2)} gr
                    <text class="nutrition-values-recipe">|</text>
                    Calories: ${recipe.caloriesPerServing.toFixed(2)} 
                </div>

              <p class="recipe__description">
                  ${recipe.description}
              </p>
          </div>
        </div>
      `;
    }

    render() {
        const recipes = this.recipes || [];
        const amountOfRecipes = recipes.length;
        const pages = Math.ceil(amountOfRecipes / 10);

        const recipesByTen = [[]];
        let counter = 0;
        recipes.forEach((item, index) => {
            if (recipesByTen[counter].length === 10) {
                counter++;
                recipesByTen[counter] = [];
            }
            recipesByTen[counter].push(item);
        });

        let recipeData = ``;

        recipesByTen.forEach((chunk, index) => {
            recipeData += `
                  <div class="page" style="display:none" id="page-${index + 1}">
              `;

            chunk.forEach((recipe, index) => {
                recipeData += `
                      ${this.recipeTemplate(recipe)}
                  `;
            })

            recipeData += `
                  </div>
              `;
        })

        this.innerHTML = `
          <div class="pagination-container">
              <div class="pages">
                  ${Array(pages).fill('').map((item, index) => `<button class="btn btn-info">${index + 1}</button>`).reduce((acc, curr) => acc.concat(curr), '')}
              </div>
          </div>
          ${recipeData}
        `;

        const pagesEl = this.querySelector('.pages');
        const buttonEls = Array.from(pagesEl.children);
        const pageEls = Array.from(document.querySelectorAll('.page'));
        pageEls[0].style.display = 'block';
        buttonEls.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                pageEls.forEach((page, pageIndex) => {
                    page.style.display = 'none';
                    if (pageIndex === index) {
                        page.style.display = 'block';
                    }
                })
            })
        })
    }
}
customElements.define('paginated-recipes', PaginatedRecipes);