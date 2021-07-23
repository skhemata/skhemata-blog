import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlogList',
  component: 'skhemata-blog',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    postsPerPage: argTypes.postsPerPage,
    pagerType: argTypes.pagerType,
    navigate: argTypes.navigate,
    skhemataBlogTextColor: argTypes.skhemataBlogTextColor,
    skhemataBlogLinkColor: argTypes.skhemataBlogLinkColor,
    skhemataBlogListTitleColor: argTypes.skhemataBlogListTitleColor,
  },
};

const Template: Story<ArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2'
  },
  postsPerPage = 10,
  pagerType = 'infinite',
  skhemataBlogTextColor,
  skhemataBlogLinkColor,
  skhemataBlogListTitleColor,
}: ArgTypes) => html`
  <style>
    body {
      --skhemata-blog-text-color: ${skhemataBlogTextColor};
      --skhemata-blog-link-color: ${skhemataBlogLinkColor};
      --skhemata-blog-list-title-color: ${skhemataBlogListTitleColor};
    }
  </style>
  <skhemata-blog-list
    .apiWordpress=${apiWordpress}
    .postsPerPage=${postsPerPage}
    .pagerType=${pagerType}
  >
  </skhemata-blog-list>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2'
  },
  postsPerPage: 10,
  pagerType: "infinite",
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog-list
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(/"/g, '\\"')}"
  posts-per-page="${Example.args.postsPerPage}"
  pager-type="${Example.args.pagerType}"
>
</skhemata-blog-list>
      `,
    },
  },
}