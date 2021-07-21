/**
 *
 * Lit Blog List Style
 *
 * */

import { css } from '@skhemata/skhemata-base';

export const SkhemataBlogListStyle = css`
  :host {
    display: block;
    margin-bottom: 40px;

    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--skhemata-blog-text-color);
  }

  .feature-img {
    border-radius: 6px;
    margin-bottom: 40px;
    background-color: var(--color);
    overflow: hidden;
  }

  .blog-featured-img > img {
    border-radius: 6px;
    position: absolute;
    object-fit: cover;
    max-width: 100%;
    top:0;
    left:0;
    z-index: -1;
    min-width: 100%;
    min-height: 100%;
  }

  .blog-feature-container {
    border-radius: 6px;
    background: rgb(0,21,36);
    background: linear-gradient(73deg, rgba(0,21,36,0.5438550420168067) 0%, rgba(25,29,50,0.5382528011204482) 100%);
    position: absolute:
    width: 100%;
    padding: 0.5rem 0rem 1rem 1rem;
    color: white;
    cursor: pointer;
  }

  .article-date > .icon {
    vertical-align: middle;
  }

  .article-date > span {
    font-size: 14px;
  }

  .blog-feature-container > strong {
    margin-bottom: 10px;
  }

  .blog-feature-attr {
    color: white;
    display: flex !important;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .feature-ribbon {
    margin-top: 1rem;
    background-color: #00B5AD;
    color: white:
    text-align: center;
  }

  .blog-feature-content-container {
    padding-right: 2rem;
    text-align: left;
  }

  .blog-feature-content-container > strong, .blog-feature-content-container > p {
    text-align: left !important;
    color: white !important;
    margin-bottom: 0.5rem !important;
  }

  .blog-feature-content-container > p {
    margin-top: 10px;
  }

  .blog-list {
    padding-top: 25px;
  }

  .blog-item {
    box-shadow: 0 0 0 1px var(--lighter-grey-color);
    margin-bottom: 50px;
    border-radius: 4px;
    text-align: center;
  }

  .blog-item .card-content {
    padding: 60px 60px 1rem 60px;
  }
  .blog-item-meta-info {
    margin-top: 2rem;
    font-size: 14px;
  }

  .blog-item-meta-info > .columns {
    margin-bottom: 0;
  }

  .blog-author-info {
    margin-top: -120px;
    margin-bottom: .5rem;
    font-size: 14px;
  }

  button.blog-title.is-ghost {
    text-decoration: none;
    margin-bottom: 10px;
    border: none;
  }

  button.blog-title.is-ghost:active {
    border: none;
  }

  .blog-meta {
    width: 100%;
    text-align: left;
    padding: 1rem 0rem 0rem 1rem;
  }

  .blog-meta > .icon, .icon {
    vertical-align: middle;
  }

  .blog-meta.desktop{
    display: none;
  }

  .blog-meta.mobile{
    padding-top: .5rem;
  }

  @media screen and (min-width: 516px){
    .blog-meta.mobile{
      display: none;
    }
    .blog-meta.desktop{
      display: block;
    }

    .blog-author-info{
      margin-bottom: 30px;
    }
  }

  .blog-title {
    height: auto;
    min-height: 2.5em;
    line-height: 1;
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
  }

  .blog-title .title {
    white-space: normal;
    transition: all 0.3s ease 0s;
    color: var(--skhemata-blog-list-title-color, rgb(50, 149, 220));
  }

  .blog-title .title:hover {
    color: var(--skhemata-blog-list-title-color, rgb(50, 149, 220));
    opacity: 75%;
  }

  .blog-author-info .image {
    display: inline-block;
  }

  .blog-post-date {
    margin: 6px 0;
    font-size:14px;
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
  @media screen and (max-width: 515px) {
    .blog-item .blog-post-date-desktop {
      display: none;
    }
  }
  @media screen and (max-width: 515px) {

    .blog-meta {
      padding: 2.5rem 0rem 0rem 1rem;
      text-align: center;
    }
    .blog-author-info {
      margin-top: -90px;
    }

    .blog-author-info h5 {
      margin-top: 1.75rem;
    }
  }
`;
