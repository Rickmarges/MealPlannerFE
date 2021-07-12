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

    connectedCallback() {
        this.render();
    }

    recipeTemplate(recipe) {
        return `
        <div class="recipe">
          <div><img src="${recipe.picture}"></div>
          <div class="recipe__content">
              <h4 class="recipe__title"><a href="./recipe.html?id=${recipe.id}">${recipe.name}</a></h4>
              <p class="recipe__description">
                  ${recipe.description}
              </p>
          </div>
        </div>
      `;
    }

    render() {
        const amountOfRecipes = this.recipes.length;
        const pages = Math.ceil(amountOfRecipes / 10);

        const recipesByTen = [[]];
        let counter = 0;
        this.recipes.forEach((item, index) => {
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