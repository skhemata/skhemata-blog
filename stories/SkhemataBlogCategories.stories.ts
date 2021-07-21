import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlogCategories',
  component: 'skhemata-blog',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    blogPagePath: argTypes.blogPagePath,
    navigate: argTypes.navigate,
    skhemataBlogCategoriesBackgroundColor: argTypes.skhemataBlogCategoriesBackgroundColor,
    skhemataBlogCategoriesTextColor: argTypes.skhemataBlogCategoriesTextColor,
  },
};

interface SkhemataBlogCategoriesArgTypes extends ArgTypes {
  skhemataBlogCategoriesTextColor: string,
  skhemataBlogCategoriesBackgroundColor: string,
}

const Template: Story<SkhemataBlogCategoriesArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2'
  },
  blogPagePath = '',
  skhemataBlogCategoriesTextColor,
  skhemataBlogCategoriesBackgroundColor,
}: SkhemataBlogCategoriesArgTypes) => html`
  <style>
    body{
      --skhemata-blog-categories-text-color: ${skhemataBlogCategoriesTextColor};
      --skhemata-blog-categories-background-color: ${skhemataBlogCategoriesBackgroundColor};
    }
  </style>
  <skhemata-blog-categories
    .apiWordpress=${apiWordpress}
    .blogPagePath=${blogPagePath}
  >
  </skhemata-blog-categories>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2'
  },
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog-categories
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(/"/g, '\\"')}"
  blog-page-path=""
>
</skhemata-blog-categories>
      `,
    },
  },
}