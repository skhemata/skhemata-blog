/**
 *
 * Lit Blog Post Element
 *
 * */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, html, css, CSSResult, property } from '@skhemata/skhemata-base';

import {
  faLinkedin,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCalendarAlt,
  faTag,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

// Import custom element directives
import { stringToHtml } from '@skhemata/skhemata-base/dist/directives/stringToHtml.js';
import { customDateFormat } from '@skhemata/skhemata-base/dist/directives/customDateFormat.js';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities.js';

import { SkhemataBlogPostStyle } from '../style/SkhemataBlogPostStyle';
import { SkhemataBlogSharedStyle } from '../style/SkhemataBlogSharedStyle';

import { translationEngDefault } from '../translation/SkhemataBlogPost/eng';

export class SkhemataBlogPost extends SkhemataBase {
  
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'blog-page-path' })
  blogPagePath = '';

  @property({ type: Boolean, attribute: 'has-featured-image' })
  hasFeaturedImage = false;

  // Component specific properties
  @property({ type: String })
  slug?: string = '';

  @property({ type: Object })
  private blogPost: any;

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  static get styles(): CSSResult[] {
    return <CSSResult[]>[
      ...super.styles,
      SkhemataBlogPostStyle,
      SkhemataBlogSharedStyle,
      css`
        .blog-category-item {
          display: inline;
          cursor: pointer;
          color: var(--skhemata-blog-link-color, var(--default-blue));
          transition: all 0.3s ease 0s;
        }
        .blog-category-item:hover {
          color: rgb(28, 119, 185);
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  constructor() {
    super();
    window.onhashchange = () => {
      this.shadowRoot
      ?.getElementById(window.location.hash.slice(1))
      ?.scrollIntoView();
    };
  }

  handleGoBack() {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {
          slug: '',
        },
        composed: true,
        bubbles: true,
      })
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return this.blogPost
      ? html`
          <div class="blog-post-author-info">
            <figure class="blog-post-author-avatar image is-64x64">
              <img
                class="is-rounded"
                src="${this.blogPost.author.avatar_url[96]}"
                alt="avatar"
              />
            </figure>

            <h5 class="blog-post-author">
              <div>
                By
                <span
                  class="blog-author-name"
                  @click="${() => {
                    this.filterPostsBy(this.blogPost.author.id, 'a');
                  }}"
                  @keydown=${(e: any) => {
                    if (e.keyCode === '13')
                      this.filterPostsBy(this.blogPost.author.id, 'a');
                  }}
                  >${this.blogPost.author.name}</span
                >
              </div>
              <div class="social-links">
                <span class="link-label">Share:</span>
                <a
                  href="${`https://www.twitter.com/home?status=${window.location}`}"
                  target="_blank"
                >
                  <fa-icon class="social-icon" .icon=${faTwitter}></fa-icon>
                </a>
                <a
                  href="${`https://www.linkedin.com/shareArticle?mini=true&url=${window.location}`}"
                  target="_blank"
                >
                  <fa-icon class="social-icon" .icon=${faLinkedin}></fa-icon>
                </a>
                <a
                  href="${`https://www.facebook.com/sharer/sharer.php?u=${window.location}`}"
                  target="_blank"
                >
                  <fa-icon class="social-icon" .icon=${faFacebook}></fa-icon>
                </a>
              </div>
            </h5>
            <span class="blog-post-date"
              ><fa-icon .icon=${faCalendarAlt}></fa-icon> ${customDateFormat(
                this.blogPost.date,
                'MMMM DD, YYYY'
              )}</span
            >
          </div>
          <h1 class="blog-post-title title is-2">
            ${decodeHtmlEntities(this.blogPost.title)}
          </h1>

          ${this.hasFeaturedImage
            ? html` <figure class="image">
                <img
                  class="blog-post-featured-image"
                  src="${this.blogPost.featured_media.source_url}"
                  alt="${this.blogPost.featured_media.alt_text}"
                  title="${this.blogPost.featured_media.title}"
                />
              </figure>`
            : html``}

          <div class="blog-post-content content">
            ${stringToHtml(this.blogPost.content.replace('slack', 'slick'))}
          </div>
          <div class="columns">
            <div class="column">
              <button
                class="button back-button is-link is-rounded"
                @click=${this.handleGoBack}
              >
                ${this.getStr('SkhemataBlogPost.backToBlog')}
              </button>
            </div>
          </div>
          <div class="columns blog-item-meta-info">
            <div class="column is-half has-text-left">
              <fa-icon .icon=${faFolder}></fa-icon>
              ${this.getStr('SkhemataBlogPost.categories')}:
              ${this.blogPost.categories
                ? this.blogPost.categories.map(
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
            <div class="column is-half has-text-right-desktop">
              <fa-icon .icon=${faTag}></fa-icon>
              ${this.getStr('SkhemataBlogPost.tags')}:
              ${this.blogPost.tags
                ? this.blogPost.tags.map(
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
        `
      : html``;
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getPost();
  }

  /**
   * Fetch a single post based on post id from WP REST API
   */
  private getPost() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(`${this.apiWordpress.url}/posts?_embed&slug=${this.slug}`)
      .then(response => {
        const contentType = response.headers.get('Content-Type');

        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // Throw error if above condition isn't met
        throw new TypeError('The format is not JSON.');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const postData = data[0];
          if (postData && postData.status === 'publish') {
            // Filter out all the categories of the post
            const filteredCategories = postData._embedded['wp:term'].filter(
              (term: any) => {
                if (term) {
                  for (let index = 0; index < term.length; index += 1) {
                    return term[index].taxonomy === 'category';
                  }
                }
                return true;
              }
            );

            // Filter out all the tags of the post
            const filteredTags = postData._embedded['wp:term'].filter(
              (term: any) => {
                if (term) {
                  for (let index = 0; index < term.length; index += 1) {
                    return term[index].taxonomy === 'post_tag';
                  }
                }
                return true;
              }
            );

            const featuredMedia = postData._embedded['wp:featuredmedia']
              ? {
                  source_url:
                    postData._embedded['wp:featuredmedia'][0].source_url,
                  alt_text: postData._embedded['wp:featuredmedia'][0].alt_text,
                  title: postData._embedded['wp:featuredmedia'][0].title,
                }
              : {
                  source_url: '',
                  alt_text: '',
                  title: '',
                };
            // Pass data to Object to be used to bind data on the template

            this.blogPost = {
              id: postData.id,
              title: postData.title.rendered,
              content: postData.content.rendered.replaceAll(
                'href="#',
                `href="${window.location.href}#`
              ),
              date: postData.date,
              author: {
                id: postData._embedded.author[0].id,
                name: postData._embedded.author[0].name,
                description: postData._embedded.author[0].description,
                avatar_url: postData._embedded.author[0].avatar_urls,
              },
              categories: filteredCategories[0],
              excerpt: postData.excerpt.rendered,
              tags: filteredTags[0],
              featured_media: featuredMedia,
            };

            this.setMetaTags();
          }
        }
      });
  }

  setMetaTags() {
    const metaDesc = document.querySelector("meta[name='description' i]");
    const excerpt = this.blogPost.excerpt.replace(/<[^>]*>?/gm, '');
    if (metaDesc) {
      metaDesc.setAttribute('content', excerpt);
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = excerpt;
      document.getElementsByTagName('head')[0].appendChild(newMetaDesc);
    }

    const title = document.querySelector('title');
    if (title) {
      title.innerHTML = this.blogPost.title;
    } else {
      const newTitle = document.createElement('title');
      newTitle.innerHTML = this.blogPost.title;
      document.getElementsByTagName('head')[0].appendChild(newTitle);
    }

    const metaKeywords = document.querySelector("meta[name='keywords' i]");
    let keywordsText = '';
    for (let i = 0; i < this.blogPost.tags.length; i += 1) {
      keywordsText += `${this.blogPost.tags[i].name}, `;
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywordsText);
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = keywordsText;
      document.getElementsByTagName('head')[0].appendChild(newMetaKeywords);
    }
  }

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
}
