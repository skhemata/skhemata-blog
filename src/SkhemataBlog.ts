/**
 *
 * Lit Blog parent component to handle routing
 *
 * */
import { html, css, CSSResult, property, SkhemataBase } from '@skhemata/skhemata-base';

// Import element dependencies
import { SkhemataBlogList } from './component/SkhemataBlogList';
import { SkhemataBlogPost } from './component/SkhemataBlogPost';
import { SkhemataBlogSearch } from './component/SkhemataBlogSearch';
import { SkhemataBlogCategories } from './component/SkhemataBlogCategories';
import { translationEngDefault } from './translation/SkhemataBlog/eng';

export class SkhemataBlog extends SkhemataBase {
  
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: String, attribute: 'blog-title' })
  blogTitle = '';

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 4;

  @property({ type: String })
  searchedBlogPosts = '';

  @property({ type: String })
  slug?: string = '';

  // Component specific properties
  @property({ type: Boolean })
  isSlugName = true;

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  static get scopedElements() {
    return {
      'skhemata-blog-list': SkhemataBlogList,
      'skhemata-blog-post': SkhemataBlogPost,
      'skhemata-blog-search': SkhemataBlogSearch,
      'skhemata-blog-categories': SkhemataBlogCategories,
    };
  }

  static get styles(): CSSResult[] {
    return <CSSResult[]>[
      ...super.styles,
      css`
        :host {
          --skhemata-blog-text-color: #000;

          display: block;
          padding: 25px 0;
          color: var(--skhemata-blog-text-color);
        }
        @media screen and (max-width: 430px) {
          :host {
            padding: 25px 20px;
          }
        }

        .blog-category-item {
          display: inline;
          cursor: pointer;
          color: var(--skhemata-blog-link-color);
          transition: all 0.3s ease 0s;
        }
        .blog-category-item:hover {
          color: rgb(28, 119, 185);
        }
        .columns {
          width: 100%;
          margin: 0px;
        }
        .columns.search,
        .columns.search .column {
          margin-top: 0px;
          margin-bottom: 0px;
          padding-top: 0px;
          padidng-bottom: 0px;
        }
      `,
    ];
  }

  constructor() {
    super();
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }

  handleNavigate(e: CustomEvent) {
    this.slug = e.detail.slug || '';
  }

  render() {
    return html`
      <div class="columns search">
        <div class="column">
          <skhemata-blog-search
            .searchedBlogPosts=${this.searchedBlogPosts}
            .blogPagePath=${this.blogPagePath}
            .translationDir=${this.translationDir}
            .translationData=${this.translationData}
            .translationLang=${this.translationLang}
          ></skhemata-blog-search>
        </div>
      </div>
      <div class="columns is-desktop">
        <div class="column is-three-quarters-desktop">
          ${this.slug
            ? html`
                <skhemata-blog-post
                  .apiWordpress=${this.apiWordpress}
                  .blogPagePath=${this.blogPagePath}
                  .searchedBlogPosts=${this.searchedBlogPosts}
                  .slug=${this.slug}
                  @navigate=${this.handleNavigate}
                  .translationDir=${this.translationDir}
                  .translationData=${this.translationData}
                  .translationLang=${this.translationLang}
                ></skhemata-blog-post>
              `
            : html`
                <skhemata-blog-list
                  .apiWordpress=${this.apiWordpress}
                  .blogPagePath=${this.blogPagePath}
                  .searchedBlogPosts=${this.searchedBlogPosts}
                  .postsPerPage=${this.postsPerPage}
                  @navigate=${this.handleNavigate}
                  .translationDir=${this.translationDir}
                  .translationData=${this.translationData}
                  .translationLang=${this.translationLang}
                ></skhemata-blog-list>
              `}
        </div>
        <skhemata-blog-categories
          class="column"
          .apiWordpress=${this.apiWordpress}
          .blogPagePath=${this.blogPagePath}
          .translationDir=${this.translationDir}
          .translationData=${this.translationData}
          .translationLang=${this.translationLang}
        ></skhemata-blog-categories>
      </div>
    `;
  }
}
