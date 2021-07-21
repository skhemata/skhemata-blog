/**
 *
 * Lit Blog Categories Style
 *
 * */

import { css } from '@skhemata/skhemata-base';

export const SkhemataBlogCategoriesStyle = css`
  :host {
    display: block;
    // padding-top: 25px;
    // margin: 40px 0;

    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  .category-list-title {
    text-align: center;
  }

  .category-item.active {
    background: lightgrey;
  }
  .category-item.active:hover {
    background: lightgrey;
  }

  .category-item:last-child {
    margin-bottom: 0;
  }

  button > span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    button > span {
      max-width: 11rem;
    }
  }

  .buttons {
    width: 100%;
  }
  .buttons > button.category-item.is-light{
    color: var(--skhemata-blog-categories-text-color, rgba(0,0,0, 0.74221));
    background-color: var(--skhemata-blog-categories-background-color, rgb(245,245,245));
    margin-bottom: 10px;
    height: auto;
  }
`;
