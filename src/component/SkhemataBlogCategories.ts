/**
 *
 * Lit Blog Search Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { html, CSSResult, property, SkhemataBase } from '@skhemata/skhemata-base';

import { SkhemataBlogCategoriesStyle } from '../style/SkhemataBlogCategoriesStyle';
import { translationEngDefault } from '../translation/SkhemataBlogCategories/eng';

// Import custom element directives

// Import element dependencies
// import {debounce} from 'lodash';
export class SkhemataBlogCategories extends SkhemataBase {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: String, attribute: 'blog-post-path' })
  blogPostPath = '';

  @property({ type: Array })
  categories = [];

  @property({ type: Number })
  currentCategory?: number;

  @property({ type: String })
  categoryTopBtn = '/';

  @property({ type: String })
  categoryTopBtnImage =
    'https://cdn2.thrinacia.com/www.thrinacia.com/img/cosmic_landing_bg.png';

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  static get styles() {
    return <CSSResult[]>[...super.styles, SkhemataBlogCategoriesStyle];
  }

  async firstUpdated() {
    await super.firstUpdated();
    this.getCategories();
  }

  constructor() {
    super();
    let params = new URLSearchParams(window.location.search);
    let c: string = params.get('c') || '';
    if (c !== '') {
      this.currentCategory = parseInt(c, 10);
    }
    window.addEventListener('popstate', () => {
      params = new URLSearchParams(window.location.search);
      c = params.get('c') || '';
      if (c !== '') {
        this.currentCategory = parseInt(c, 10);
      } else {
        this.currentCategory = undefined;
      }
    });
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html` <h3
        class="title is-5 category-list-title"
        style="margin-left: 18px"
      >
        ${this.getStr('SkhemataBlogCategories.categoriesTitle')}
      </h3>
      <div class="buttons">
        <button
          class="category-item button is-light is-fullwidth"
          @click="${() => this.filterCategory(-1)}"
        >
          ${this.getStr('SkhemataBlogCategories.allCategories')}
        </button>
        ${this.categories
          .filter((obj: any) => {
            if (!obj.name.includes('Featured Articles')) {
              return obj;
            }
            return false;
          })
          .map((category: any) =>
            category.name !== 'Featured Articles' ||
            category.name !== 'Featured Articles Landing'
              ? html`
                  <button
                    class="category-item button is-light is-fullwidth ${this
                      .currentCategory === category.id
                      ? 'active'
                      : ''}"
                    @click=${() => this.filterCategory(category.id)}
                  >
                    <span>${category.name}</span>
                  </button>
                `
              : html``
          )}
      </div>`;
  }

  /**
   *  Get categories
   */
  private async getCategories() {
    await fetch(`${this.apiWordpress.url}/categories?parent=0&per_page=100`)
      .then(response => response.json())
      .then(async data => {
        this.categories = data;
      }).catch(() => {
      });
  }

  filterCategory(id: number) {
    const params = new URLSearchParams(window.location.search);
    if (parseInt(params.get('c') || '', 10) === id || id === -1) {
      this.currentCategory = undefined;
      params.delete('c');
    } else {
      this.currentCategory = id;
      params.set('c', id.toString());
    }
    // window.location.href = `/${this.blogPagePath}?${params.toString()}`;
    window.history.pushState(
      {},
      '',
      decodeURIComponent(`/${this.blogPagePath}?${params.toString()}`)
    );
    window.scrollTo({ top: 0 });

    window.dispatchEvent(new Event('popstate'));
  }
}
