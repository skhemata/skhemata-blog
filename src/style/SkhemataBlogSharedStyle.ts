/**
 *
 * Lit Blog Post Style
 *
 */

import { css } from '@skhemata/skhemata-base';

export const SkhemataBlogSharedStyle = css`
  :host {
    display: block;
    --default-text: rgb(92, 98, 101);
    --default-blue: rgb(50, 149, 220);
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--skhemata-blog-text-color);
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  em {
    color: var(--skhemata-blog-text-color, var(--default-text));
  }

  a {
    color: #3295dc;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  a:hover {
    color: #1c77b9;
  }

  .card {
    color: var(--skhemata-blog-text-color);
  }

  .blog-category-item {
    display: inline;
    color: var(--skhemata-blog-link-color, var(--default-blue));
    transition: all 0.3s ease 0s;
    cursor: pointer;
    margin-right: -0.2em
  }

  .blog-author-name {
    color: var(--skhemata-blog-link-color, var(--default-blue));
    transition: all 0.3s ease 0s;
    cursor: pointer;
  }

  .blog-category-item:hover,
  .blog-author-name:hover {
    color: var(--skhemata-blog-link-color, var(--default-blue));
    opacity: 75$;
  }
`;
