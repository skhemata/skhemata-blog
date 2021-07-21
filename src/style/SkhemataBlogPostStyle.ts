/**
 *
 * Lit Blog Post Style
 *
 * */

import { css } from '@skhemata/skhemata-base';

export const SkhemataBlogPostStyle = css`
  :host {
    display: block;
    margin: 60px 0;

    border: 1px solid lightgrey;
    border-radius: 6px;
    padding: 2rem;

    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  button.back-button.is-link.is-rounded {
    background-color: var(--skhemata-blog-post-back-button-background-color, rgb(50, 115, 220));
    color: var(--skhemata-blog-post-back-button-color, white);
  }

  .blog-post-categories {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: -5px;
    margin-right: -5px;
  }

  .blog-post-title,
  .blog-post-date {
    text-align: left;
  }

  .blog-post-title.title {
    margin-bottom: 10px;
  }

  .blog-post-content {
    margin-top: 40px;
  }

  .blog-post-date {
    text-align: left;
    font-size: 14px;
  }
  .blog-item-meta-info {
    font-size: 14px;
  }
  .blog-post-author-info {
    margin-bottom: 30px;
    margin-top: -4rem;
    text-align: left;
    font-size: 14px;
  }

  .blog-post-featured-image,
  .post-featured-image {
    width: 100% !important;
  }

  .blog-post-author-avatar {
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .blog-post-author {
    display: flex;
    justify-content: space-between;
  }

  .blog-meta {
    text-align: center;
  }

  .blog-post-content figure {
    font-style: italic;
    margin-bottom: 30px;
  }

  .blog-post-content h1 {
    font-size: 3rem;
  }

  .blog-post-content h2 {
    font-size: 2.5rem;
  }

  .blog-post-content h3 {
    font-size: 2rem;
  }

  .blog-post-content h4 {
    font-size: 1.5rem;
  }

  .blog-post-content h5 {
    font-size: 1.25rem;
  }

  .blog-post-content h6 {
    font-size: 1rem;
  }

  .blog-post-content h1,
  .blog-post-content h2,
  .blog-post-content h3,
  .blog-post-content h4,
  .blog-post-content h5,
  .blog-post-content h6 {
    font-weight: bold;
  }

  .blog-post-content figure figcaption {
    color: var(--light-grey-color);
    font-size: 14px;
  }

  .blog-post-content figure.wp-caption {
    width: inherit !important;
  }

  p {
    margin-bottom: 24px;
  }

  .social-icon {
    font-size: 1.5rem;
    color: var(--skhemata-blog-post-social-icon-color, #f2711c);
  }
  
  @media screen and (max-width: 430px) {
    .blog-post-author {
      display: block;
      padding-bottom: 1rem;
    }
    .blog-post-author .social-links {
      padding-top: 0.5rem;
    }
  }

  .blog-post-content.content h1,
  .blog-post-content.content h2,
  .blog-post-content.content h3,
  .blog-post-content.content h4,
  .blog-post-content.content h5,
  .blog-post-content.content h6,
  .blog-post-title.title {
    color: var(--skhemata-blog-post-heading-color, rgb(54, 54, 54));
  }
`;
