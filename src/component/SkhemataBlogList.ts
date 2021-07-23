/**
 *
 * Lit Blog List Element
 *
 * */

// Import litelement base class, html helper function & typescript decorators
import { html, css, CSSResult, SkhemataBase, property } from '@skhemata/skhemata-base';

import {
  faCalendarAlt,
  faFolder,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

// Import custom element directives
import { stringToHtml } from '@skhemata/skhemata-base/dist/directives/stringToHtml';
import { customDateFormat } from '@skhemata/skhemata-base/dist/directives/customDateFormat';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities';
import { SkhemataBlogListStyle } from '../style/SkhemataBlogListStyle';
import { SkhemataBlogSharedStyle } from '../style/SkhemataBlogSharedStyle';

import { translationEngDefault } from '../translation/SkhemataBlogList/eng';

// Import element dependencies
import './SkhemataBlogSearch';

export class SkhemataBlogList extends SkhemataBase {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 4;

  @property({ type: String, attribute: 'pager-type' })
  pagerType = "infinite";

  @property({ type: Number})
  currentPage = 1;

  @property({ type: String })
  searchedBlogPosts = '';

  @property({ type: Array })
  private blogPosts: any = [];

  @property({ type: Array })
  private blogFeatures: any = [];

  @property({ type: Number })
  totalPages = 0;

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Number })
  maxLoadCount = 0;

  @property({ type: Number })
  private count = 1;

  @property({ type: Object }) translationData = {
    eng: translationEngDefault,
  };

  static get styles() {
    return <CSSResult[]>[
      super.styles,
      SkhemataBlogListStyle,
      SkhemataBlogSharedStyle,
      css`
        .traditional-pager {
          text-align: center;
        }
      `
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
      'popstate',
      () => {
        if(this.pagerType === "traditional") {
          this.loadPostPage();
        } else {
          this.getPosts();
        }
      },
      false
    );
  }

  willUpdate(changedProperties: Map<string, any>){
    if(changedProperties.has('apiWordpress')){
      this.getPosts();
    }
    if(changedProperties.has('postPerPage')){
      this.getPosts();
    }
    if(changedProperties.has('pagerType')){
      this.getPosts();
    }
    super.willUpdate(changedProperties);
  }

  /**
   * dispatch navigate event
   * @param slug post slug
   */
  navigateToPost(slug: string) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {
          slug,
        },
        composed: true,
        bubbles: true,
      })
    );
    window.dispatchEvent(new CustomEvent('clearblogsearch'));
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    let previous = html``;
    let next = html``;
    let previousPages = html``;
    let nextPages = html``;
    let count = 1;

    const params = new URLSearchParams(window.location.search);
    let page = 1;
    const leadingTrailingCount = 3;
    const pParam = params.get('p');
    
    if(pParam != null && !Number.isNaN(pParam) ) {
      const pageParam = parseInt(pParam, 10);
      page = pageParam;
    }

    previous = html`<button @click="${() => this.setPageNumber(1)}" class="button" > First </button>
    <button @click="${() => this.setPageNumber(page-1)}" class="button" > Previous </button>`;
    if (page <= 1) {
      previous = html``;
    }
    
    next = html`<button @click="${() => this.setPageNumber(page+1)}" class="button" > Next </button>
    <button @click="${() => this.setPageNumber(this.totalPages)}" class="button" > Last </button>`;
    if (page >= this.totalPages) {
      next = html``;
    }
    
    for (let index = page; index > 1; index -= 1) {
      if(count > leadingTrailingCount) {
        break;
      }
      previousPages = html`<button @click="${(event: any) => this.goToButtonPage(event)}" page-value="${page-count}"  class="button" >${page-count}</button>${previousPages}`;
      count += 1;
    }
    
    count = 1;
    for (let index = page; index < this.totalPages; index += 1) {
      if(count > leadingTrailingCount) {
        break;
      }
      nextPages = html`${nextPages}<button @click="${(event: any) => this.goToButtonPage(event)}" page-value="${page+count}" class="button" >${page+count}</button>`;
      count += 1;
    }

    let pagination = html``;
    if (this.totalPages > 1) {
      pagination = html`
      <div class="traditional-pager">
      ${previous}${previousPages}<button @click="" class="button" ><b>${page}</b></button>${nextPages}${next}
      </div>`;
    }

    return html`
      ${this.blogFeatures.map(
        (post: any) =>
          html`
            <figure
              class="image feature-img blog-featured-img mb-4"
              @click=${() => this.navigateToPost(post.slug)}
              @keydown=${(e: any) => {
                if (e.code === '13') this.navigateToPost(post.slug);
              }}
            >
              ${post._embedded['wp:featuredmedia']['0'].source_url !== undefined
                ? html`<img
                    src="${post._embedded['wp:featuredmedia']['0'].source_url}"
                    alt="featured"
                  /> `
                : html``}
              <div class="blog-feature-container">
                <div class="blog-feature-attr">
                  <div class="article-date">
                    <br />
                    <fa-icon .icon=${faCalendarAlt}></fa-icon>
                    ${this.formatDate(post.date)}
                  </div>
                  <div class="feature-ribbon" style="padding: 5px 10px;">
                    Featured Article
                  </div>
                </div>
                <div class="blog-feature-content-container has-text-white">
                  <strong class="is-size-5 has-text-white"
                    ><span
                      >${decodeHtmlEntities(post.title.rendered)}</span
                    ></strong
                  >
                  <br />
                  <p class="mb-1">
                    ${stringToHtml(
                      post.excerpt.rendered
                        .replace('<p>', '')
                        .replace('</p>', '')
                    )}
                  </p>
                </div>
              </div>
            </figure>
          `
      )}

      <div class="blog-list">
        ${this.blogPosts.map(
          (post: any) => html`
            <div class="blog-item card">
              <div class="blog-meta desktop">
                <span class="blog-post-date">
                  <fa-icon .icon=${faCalendarAlt}></fa-icon>
                  ${customDateFormat(post.date, 'MMMM DD, YYYY')}
                </span>
              </div>
              <div class="card-content">
                <div class="blog-author-info">
                  <figure class="blog-author-avatar image is-64x64">
                    <img
                      src="${post._embedded?.author[0].avatar_urls[96]}"
                      class="is-rounded"
                      alt="avatar"
                    />
                  </figure>
                  <h5>
                    By
                    <span
                      class="blog-author-name"
                      @click="${() => {
                        this.filterPostsBy(post._embedded?.author[0].id, 'a');
                      }}"
                      @keydown=${(e: any) => {
                        if (e.keyCode === '13')
                          this.filterPostsBy(post._embedded?.author[0].id, 'a');
                      }}
                      >${post._embedded?.author[0].name}</span
                    >
                  </h5>
                  <div class="blog-meta mobile">
                    <span class="blog-post-date">
                      <fa-icon .icon=${faCalendarAlt}></fa-icon>
                      ${customDateFormat(post.date, 'MMMM DD, YYYY')}
                    </span>
                  </div>
                </div>

                <button
                  class="button is-ghost blog-title"
                  @click=${() => this.navigateToPost(post.slug)}
                >
                  <h2 class="title is-4">
                    ${decodeHtmlEntities(post.title.rendered)}
                  </h2>
                </button>

                <div class="blog-excerpt">
                  ${stringToHtml(post.excerpt.rendered)}
                </div>
                <div class="blog-item-meta-info">
                  <div class="columns">
                    <div class="column">
                      <fa-icon .icon=${faFolder}></fa-icon>
                      ${this.getStr('SkhemataBlogList.categories')}:
                      ${post.categories
                        ? post.categories
                            .filter((obj: any) => {
                              if (!obj.name.includes('Featured Articles')) {
                                return obj;
                              }
                              return false;
                            })
                            .map(
                              (item: any, index: Number, arr: any) => html`
                                <div
                                  class="blog-category-item"
                                  value=${item.id}
                                  @click="${() => {
                                    this.filterPostsBy(item.id, 'c');
                                  }}"
                                  @keydown=${(e: any) => {
                                    if (e.keyCode === '13')
                                      this.filterPostsBy(item.id, 'c');
                                  }}
                                >
                                  ${item.name}
                                </div>
                                ${arr.length > 1 && arr.length - 1 !== index
                                  ? html`, `
                                  : html``}
                              `
                            )
                        : ''}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <span class="icon is-small">
                        <fa-icon .icon=${faTag}></fa-icon>
                      </span>
                      ${this.getStr('SkhemataBlogList.tags')}:
                      ${post._embedded['wp:term'][1]
                        ? post._embedded['wp:term'][1].map(
                            (item: any, index: Number, arr: any) => html`
                              <div
                                class="blog-category-item"
                                value=${item.id}
                                @click="${() => {
                                  this.filterPostsBy(item.id, 't');
                                }}"
                                @keydown=${(e: any) => {
                                  if (e.keyCode === '13')
                                    this.filterPostsBy(item.id, 't');
                                }}
                              >
                                ${item.name}
                              </div>
                              ${arr.length > 1 && arr.length - 1 !== index
                                ? html`, `
                                : html``}
                            `
                          )
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        )}
      </div>

      ${(this.pagerType === "traditional") ? 
        pagination : 
        html`<div class="load-more-button">
          ${this.count < this.maxLoadCount
            ? html`<button @click="${this.loadMorePosts}" class="button">
                ${this.getStr('SkhemataBlogList.showMoreButton')}
              </button>`
            : ``}
        </div>`
      }
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getFeatures();
    this.getPosts();
  }

  /**
   * Fetch Featured Posts from WP REST API
   */
  private getFeatures() {
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
      `${this.apiWordpress.url}/categories/?search=featured-articles-landing`
    )
      .then(response => {
        if(!response.ok){
          return;
        }
        this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
        this.totalCount = Number(response.headers.get('X-WP-Total'));
        const contentType = response.headers.get('Content-Type');

        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        return new TypeError('The format is not JSON.');

        // Throw error if above condition isn't met
        // throw new TypeError('The format is not JSON.');
      })
      .then(categories => {
        if(categories?.length > 0){
        categoryParams = `&categories=${categories[0].id}`;
        fetch(
          `${this.apiWordpress.url}/posts?_embed${searchParams}${categoryParams}&filter[orderby]=date&order=desc`
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
            // throw new TypeError('The format is not JSON.');
          })
          .then(data => {
            if (typeof data !== 'undefined') {
              // Loop through data
              // data.forEach((element: any) =>
              //  SkhemataBlogFeatured.formatCategories(element)
              // );

              this.blogFeatures = data.map(SkhemataBlogList.formatCategories);
            }
          });
        }
      })
  }

  /**
   * Fetch Posts from WP REST API
   */
  private async getPosts() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    const author = params.get('a');
    const tag = params.get('t');
    let searchParams = '';
    let categoryParams = '';
    let authorParams = '';
    let tagParams = '';
    const orderbyParam = `&orderby=relevance`;
    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }
    if (category) {
      categoryParams = `&categories=${category}`;
    }
    if (author) {
      authorParams = `&author=${author}`;
    }
    if (tag) {
      tagParams = `&tags=${tag}`;
    }
    await fetch(
      `${this.apiWordpress.url}/posts?_embed${searchParams}${categoryParams}${authorParams}${tagParams}&per_page=${this.postsPerPage}`
    )
      .then(response => {
        if(!response.ok){
          return;
        }
        this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
        this.totalCount = Number(response.headers.get('X-WP-Total'));
        const contentType = response.headers.get('Content-Type');

        this.maxLoadCount = Math.ceil(this.totalCount / 10);

        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // Throw error if above condition isn't met
        // throw new TypeError('The format is not JSON.');
      })
      .then(data => {
        if (typeof data !== 'undefined') {
          this.blogPosts = data.map(SkhemataBlogList.formatCategories);
        }
      }).catch(() => {
        this.blogPosts = [];
      });
  }

  /**
   * Load more posts event handler
   */
  private loadMorePosts() {
    this.count += 1;
    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    const author = params.get('a');
    const tag = params.get('t');

    let tagParams = '';
    let searchParams = '';
    let categoryParams = '';
    let authorParams = '';

    const orderbyParam = `&orderby=relevance`;
    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }
    if (category) {
      categoryParams = `&categories=${category}`;
    }
    if (author) {
      authorParams = `&author=${author}`;
    }
    if (tag) {
      tagParams = `&tags=${tag}`;
    }
    fetch(
      `${this.apiWordpress.url}/posts?_embed&page=${this.count}${searchParams}${categoryParams}${authorParams}${tagParams}&per_page=${this.postsPerPage}`
    )
      .then(response => response.json())
      .then(data => {
        const posts: [] = data;
        this.blogPosts = [
          ...this.blogPosts,
          ...posts.map(SkhemataBlogList.formatCategories),
        ];
      });
  }

  private static formatCategories(data: any) {
    // Filter out all the categories of the post
    const formattedData = data;
    if (data && data._embedded) {
      const filteredCategories = data._embedded['wp:term'].filter(
        (term: any, index: any) =>
          term.length > 0 && term[index] ? term[index].taxonomy === 'category' : false
      );

      [formattedData.categories] = filteredCategories;
    }
    return formattedData;
  }

  private formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      dateObj
    );
    return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
  };

  /**
   * Filters post based on query params
   * @param id tag/category/author id
   * @param queryId query param id
   */
  filterPostsBy(id: string, queryId: string) {
    const params = new URLSearchParams(window.location.search);
    if (params.get(queryId) === id) {
      params.delete(queryId);
    } else {
      params.set(queryId, id);
    }
    window.history.pushState(
      {},
      '',
      decodeURIComponent(`${this.blogPagePath}?${params.toString()}`)
    );
    window.scrollTo({ top: 0 });

    window.dispatchEvent(new Event('popstate'));
  }

  cleanExcerpt = (excerpt: string = '') =>
    excerpt.replace(/<a.*>.*?.<\/span>/g, '');

    
  private goToButtonPage(event: any) {
    let page = 1;
    const buttonValue = event.target.attributes["page-value"].value;
    if(buttonValue != null) {
      page = parseInt(buttonValue, 10);
    }
    this.setPageNumber(page);
  }

  private setPageNumber(page: any) {
    let setPage = page;
    if(setPage < 1) {
      setPage = 1;
    }
    if(setPage > this.totalPages) {
      setPage = this.totalPages;
    }
    const params = new URLSearchParams(window.location.search);
    params.set('p', setPage);
    this.currentPage = setPage;
    window.history.pushState(
      {},
      '',
      `/${this.blogPagePath}?${params.toString()}`
    );
    window.dispatchEvent(new Event('popstate'));
  }

  private loadPostPage() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('p');

    const search = params.get('s');
    const category = params.get('c');
    const author = params.get('a');
    const tag = params.get('t');

    let tagParams = '';
    let searchParams = '';
    let categoryParams = '';
    let authorParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }
    if (category) {
      categoryParams = `&categories=${category}`;
    }
    if (author) {
      authorParams = `&author=${author}`;
    }
    if (tag) {
      tagParams = `&tags=${tag}`;
    }
    fetch(
      `${this.apiWordpress.url}/posts?_embed&page=${page}${searchParams}${categoryParams}${authorParams}${tagParams}&per_page=${this.postsPerPage}`
    )
      .then(response => {
        if(response.status === 200) {
          this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
          this.totalCount = Number(response.headers.get('X-WP-Total'));
          const contentType = response.headers.get('Content-Type');

          this.maxLoadCount = Math.ceil(this.totalCount/10);
          // Check if response header content type is json
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          // Throw error if above condition isn't met
          throw new TypeError('The format is not JSON.');
        } else {
          return response.json();
        }
      })
      .then(response => {
        // Set page to 1 if invalid page number.
        if(response.code && response.code === "rest_post_invalid_page_number") {
          this.setPageNumber(1);
        } else if (!response.code && typeof response !== 'undefined') {
          this.blogPosts = response.map(SkhemataBlogList.formatCategories);
        }
      });
  }
}


