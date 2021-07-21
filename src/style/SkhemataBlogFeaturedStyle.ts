/**
 *
 * Lit Blog List Style
 *
 * */

import { css } from '@skhemata/skhemata-base';

export const SkhemataBlogFeaturedStyle = css`
  :host {
    display: block;
    margin: 40px 0;

    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--skhemata-blog-text-color, #5c265);
  }

  .p-lr {
    padding-left: 20px;
    padding-right: 20px;
  }
  .blog-list {
    padding-top: 25px;
    display: flex;
    flex-direction: row;
  }

  .blog-list > .blog-item {
    margin-right: 25px;
  }

  .blog-list > .blog-item:last-child {
    margin-right: 0px;
  }

  .blog-item {
    box-shadow: none;
    border: 1px solid var(--lighter-grey-color);
    margin-bottom: 50px;
    border-radius: 4px;
    text-align: center;
    width: 35%;
  }

  .blog-item.card {
    transition: 0.3s;
  }
  .blog-item.card:hover {
    box-shadow: 11px 20px 50px -25px #5b5b5b;
    -webkit-box-shadow: 11px 20px 50px -25px #5b5b5b;
    -moz-box-shadow: 11px 20px 50px -25px #5b5b5b;
    border: 1px solid #39444b;
  }

  .blog-item .featured {
    background: transparent;
    cursor: pointer;
    border: none;
    padding: 0;
  }

  .blog-item .featured:focus-visible {
    outline: none;
  }

  .blog-item .featured:visited {
    text-decoration: none;
  }

  .blog-item .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 525px;
    padding: 0;
  }

  .blog-author-info {
    margin-top: -80px;
    margin-bottom: 30px;
  }

  .article-title {
    margin-bottom: 10px;
    margin-top: 1rem;
    text-align: left;
    color: var(--skhemata-blog-featured-title-color, red);
  }

  .article-read-more {
    padding: 30px 20px;
  }
  .article-read-more a {
    padding: 0.5rem 0rem;
    border: 2px solid;
    border-radius: 5px;
    display: block;
    color: var(--skhemata-blog-featured-read-more-color, var(--default-blue));
    background-color: var(--skhemata-blog-featured-read-more-background-color, transparent);
  }

  .article-read-more a:hover {
    border-color: var(--skhemata-blog-featured-read-more-background-color-hover, var(--default-blue));
    color: var(--skhemata-blog-featured-read-more-color-hover, white);
    background-color: var(--skhemata-blog-featured-read-more-background-color-hover, var(--default-blue));
  }

  .blog-author-info .image {
    display: inline-block;
  }

  .blog-post-date {
    margin: 6px 0;
  }

  .blog-excerpt {
    margin-top: 15px;
  }

  .load-more-button {
    text-align: center;
  }

  .load-more-button .button {
    padding: 8px 28px;
  }
  .feature-img img {
    height: 150px;
    object-fit: cover;
    width: 100%;
  }
  .feature-img {
    display: flex;
    justify-content: center;
  }

  .article-info {
    display: flex;
    font-size: 12px;
    margin-bottom: 30px;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0.7;
  }

  .article-info > * {
    display: flex;
  }
  .article-author {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .article-description {
    margin-bottom: auto;
    text-align: left;
  }
  .article-title-container {
    height: 110px;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 991px) {
    .blog-list {
      display: flex;
      flex-direction: column;
    }

    .blog-item {
      width: 100%;
    }
  }
`;
