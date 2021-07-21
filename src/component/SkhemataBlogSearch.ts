/**
 *
 * Lit Blog Search Element
 *
 * */

// Import litelement base class, html helper function & typescript decorators
import { html, CSSResult, property, SkhemataBase } from '@skhemata/skhemata-base';

// Import lit-html, directives & etc

// Import custom style elements
import { SkhemataFormTextbox } from '@skhemata/skhemata-form';
import { SkhemataBlogSearchStyle } from '../style/SkhemataBlogSearchStyle';
import { translationEngDefault } from '../translation/SkhemataBlogSearch/eng';

export class SkhemataBlogSearch extends SkhemataBase {
  
  // properties
  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: String })
  searchedBlogPosts = '';

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  @property({ type: String })
  searchTerm: String | null = '';

  static get scopedElements() {
    return {
      'sk-form-textbox': SkhemataFormTextbox,
    };
  }

  static get styles() {
    return <CSSResult[]>[...super.styles, SkhemataBlogSearchStyle];
  }

  constructor() {
    // Always call super() first
    super();
    const params = new URLSearchParams(window.location.search);
    this.searchTerm = params.get('s');
    window.addEventListener('clearblogsearch', () => {
      this.searchTerm = '';
      this.requestUpdate();
    })
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <sk-form-textbox
        id="search-input"
        .value=${this.searchTerm || ''}
        type="search"
        placeholder=${this.getStr('SkhemataBlogSearch.searchPlaceholder')}
        @keyup=${this.onSearch}
      ></sk-form-textbox>
    `;
  }

  /**
   *  Search posts when value is entered
   */
  onSearch(event: any) {
    const params = new URLSearchParams(window.location.search);
    params.set('s', event.target.value);
    this.searchTerm = event.target.value;
    window.history.pushState(
      {},
      '',
      `/${this.blogPagePath}?${params.toString()}`
    );
    window.dispatchEvent(new Event('popstate'));
  }
}
