/* eslint-disable lit-a11y/anchor-is-valid */
/**
 *
 * Lit Blog List Element
 *
 * */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, html, CSSResult, property } from '@skhemata/skhemata-base';

// Import custom style elements
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

import { stringToHtml } from '@skhemata/skhemata-base/dist/directives/stringToHtml';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities';

import { SkhemataBlogFeaturedStyle } from '../style/SkhemataBlogFeaturedStyle';
import { SkhemataBlogSharedStyle } from '../style/SkhemataBlogSharedStyle';

import { translationEngDefault } from '../translation/SkhemataBlogFeatured/eng';

// Import custom element directives

// Import element dependencies
import './SkhemataBlogSearch';

export class SkhemataBlogFeatured extends SkhemataBase {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 3;

  @property({ type: String })
  searchedBlogPosts = '';

  @property({ type: Array })
  private blogPosts = [];

  @property({ type: Number })
  totalPages = 0;

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Object }) translationData = {
    eng: translationEngDefault,
  };

  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      SkhemataBlogFeaturedStyle,
      SkhemataBlogSharedStyle,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  constructor() {
    // Always call super() first
    super();
    window.addEventListener(
      'hashchange',
      () => {
        this.getPosts();
      },
      false
    );
  }

  navigate(slug: string) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {
          slug,
        },
      })
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <div class="blog-list">
        ${this.blogPosts.map(
          (post: any) => html`
            <div class="blog-item card">
              <button class="featured" @click=${() => this.navigate(post.slug)}>
                <div class="card-content">
                  ${post._embedded['wp:featuredmedia']
                    ? html`
                        <figure class="image feature-img">
                          <img
                            src="${post._embedded['wp:featuredmedia']['0']
                              .source_url}"
                            alt="featured"
                          />
                        </figure>
                      `
                    : null}
                  <div class="article-title-container p-lr">
                    <h2 class="blog-title title is-5 article-title">
                      ${decodeHtmlEntities(post.title.rendered)}
                    </h2>
                  </div>
                  <div class="article-info p-lr">
                    <div class="article-author">
                      <fa-icon
                        style="margin-right: 0.5rem;"
                        .icon=${faUser}
                      ></fa-icon>
                      ${post._embedded.author['0'].name}
                    </div>
                    <div class="article-date">
                      <fa-icon
                        style="margin-right: 0.5rem;"
                        .icon=${faCalendarAlt}
                      ></fa-icon>

                      ${this.formatDate(post.date)}
                    </div>
                  </div>
                  <div class="article-description p-lr">
                    ${post.excerpt.rendered.length > 250
                      ? stringToHtml(
                          `${post.excerpt.rendered.substring(0, 200)}...`
                        )
                      : stringToHtml(post.excerpt.rendered.substring(0, 200))}
                  </div>
                  <div class="article-read-more">
                    <a class="has-text title is-6">
                      ${this.getStr('SkhemataBlogFeatured.readMore')}
                    </a>
                  </div>
                </div>
              </button>
            </div>
          `
        )}
      </div>
    `;
  }

  private formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      dateObj
    );
    return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
  };

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getPosts();
  }

  /**
   * Fetch Posts from WP REST API
   */
  private getPosts() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    let searchParams = '';
    let categoryParams = '';
    if (search && search.length > 3) {
      searchParams = `&search=${search}`;
    }

    fetch(
      `${this.apiWordpress.url}/categories/?search=featured-article`
    )
      .then(response => {
        this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
        this.totalCount = Number(response.headers.get('X-WP-Total'));
        const contentType = response.headers.get('Content-Type');

        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // Throw error if above condition isn't met
        throw new TypeError('The format is not JSON.');
      })
      .then(categories => {
        categoryParams = `&categories=${categories[0].id}`;
        fetch(
          `${this.apiWordpress.url}/posts?_embed${searchParams}${categoryParams}&per_page=${this.postsPerPage}`
        )
          .then(response => {
            this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
            this.totalCount = Number(response.headers.get('X-WP-Total'));
            const contentType = response.headers.get('Content-Type');

            // Check if response header content type is json
            if (contentType && contentType.includes('application/json')) {
              return response.json();
            }
            // Throw error if above condition isn't met
            throw new TypeError('The format is not JSON.');
          })
          .then(data => {
            if (typeof data !== 'undefined') {
              // Loop through data
              // data.forEach((element: any) =>
              //  SkhemataBlogFeatured.formatCategories(element)
              // );

              this.blogPosts = data.map(SkhemataBlogFeatured.formatCategories);
            }
          });
      });
  }

  /**
   * Format wp categories
   */
  private static formatCategories(data: any) {
    // Filter out all the categories of the post
    const formattedData = data;
    if (data && data._embedded) {
      const filteredCategories = data._embedded['wp:term'].filter(
        (term: any, index: any) =>
          term.length > 0 ? term[index].taxonomy === 'category' : false
      );

      [formattedData.categories] = filteredCategories;
    }
    return formattedData;
  }
}
