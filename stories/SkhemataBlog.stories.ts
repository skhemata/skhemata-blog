import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { argTypes, ArgTypes, Story } from './argTypes';
const {
  skhemataBlogTextColor,
  skhemataBlogLinkColor,
  skhemataBlogListTitleColor,
  skhemataBlogCategoriesTextColor,
  skhemataBlogCategoriesBackgroundColor
} = argTypes;

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlog',
  component: 'skhemata-blog',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    postsPerPage: argTypes.postsPerPage,
    pagerType: argTypes.pagerType,
    blogPagePath: argTypes.blogPagePath,
    slug: argTypes.slug,
    navigate: argTypes.navigate,
    skhemataBlogTextColor,
    skhemataBlogLinkColor,
    skhemataBlogListTitleColor,
    skhemataBlogCategoriesTextColor,
    skhemataBlogCategoriesBackgroundColor
  },
  parameters: {
    widgetCode: `
      <skhemata-blog 
      blog-title="DevRadius Blog"
      blog-page-path="demo"
      blog-post-path="post"
      posts-per-page="10"
      api-wordpress='{"url": "https://wp.skhemata.com/wp-json/wp/v2"}'
      ></skhemata-blog>

      <script type="module" src="https://cdn.jsdelivr.net/npm/@skhemata/skhemata-blog@latest/build/index.js"></script> 
    `,
  },
};

const Template: Story<ArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.skhemata.com/wp-json/wp/v2'
  },
  blogPagePath = '',
  postsPerPage = 10,
  pagerType = 'infinite',
  slug = '',
  skhemataBlogTextColor,
  skhemataBlogLinkColor,
  skhemataBlogListTitleColor,
  skhemataBlogCategoriesTextColor,
  skhemataBlogCategoriesBackgroundColor
}: ArgTypes) => html`
  <style>
    body {
      --skhemata-blog-text-color: ${skhemataBlogTextColor};
      --skhemata-blog-link-color: ${skhemataBlogLinkColor};
      --skhemata-blog-list-title-color: ${skhemataBlogListTitleColor};
      --skhemata-blog-categories-text-color: ${skhemataBlogCategoriesTextColor};
      --skhemata-blog-categories-background-color: ${skhemataBlogCategoriesBackgroundColor};
    }
  </style> 
  <skhemata-blog
    .apiWordpress=${apiWordpress}
    .blogPagePath=${blogPagePath}
    .postsPerPage=${postsPerPage}
    .pagerType=${pagerType}
    .slug=${slug}
  >
  </skhemata-blog>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.skhemata.com/wp-json/wp/v2'
  },
  postsPerPage: 10,
  pagerType: "infinite",
};

Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(/"/g, '\\"')}"
  blog-page-path=""
  posts-per-page="${Example.args.postsPerPage}"
  pager-type="${Example.args.pagerType}"
  slug=""
>
</skhemata-blog>
      `,
    },
  },
}
