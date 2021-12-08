import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { SkhemataBlogFeaturedStyle } from '../src/style/SkhemataBlogFeaturedStyle.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlogFeatured',
  component: 'skhemata-blog',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    navigate: argTypes.navigate,
    skhemataBlogTextColor: argTypes.skhemataBlogTextColor,
    skhemataBlogFeaturedTitleColor: {
      name: '--skhemata-blog-featured-title-color',
      description: 'Color of the featured article title',
      defaultValue: 'rgb(50, 149, 220)',
      control: 'color',
      table: {
        category: 'CSS Properties',
        type: 'color'
      },
    },
    skhemataBlogFeaturedReadMoreColor: {
      name: '--skhemata-blog-featured-read-more-color',
      description: 'Color of the read more button',
      defaultValue: 'rgb(50, 149, 220)',
      control: 'color',
      table: {
        category: 'CSS Properties',
        type: 'color'
      },
    },
    skhemataBlogFeaturedReadMoreBackgroundColor: {
      name: '--skhemata-blog-featured-read-more-background-color',
      description: 'Background color of the read more button',
      defaultValue: 'rgba(255, 255, 255, 0)',
      control: 'color',
      table: {
        category: 'CSS Properties',
        type: 'color'
      },
    },
    skhemataBlogFeaturedReadMoreColorHover: {
      name: '--skhemata-blog-featured-read-more-color-hover',
      description: 'Color of the read more button',
      defaultValue: 'rgb(255, 255, 255)',
      control: 'color',
      table: {
        category: 'CSS Properties',
        type: 'color'
      },
    },
    skhemataBlogFeaturedReadMoreBackgroundColorHover: {
      name: '--skhemata-blog-featured-read-more-background-color-hover',
      description: 'Background color of the read more button',
      defaultValue: 'rgb(50, 149, 220)',
      control: 'color',
      table: {
        category: 'CSS Properties',
        type: 'color'
      },
    }
  },
};

interface SkhemataBlogFeaturedArgTypes extends ArgTypes {
  skhemataBlogFeaturedTitleColor?: string,
  skhemataBlogFeaturedReadMoreColor?: string,
  skhemataBlogFeaturedReadMoreBackgroundColor?: string,
  skhemataBlogFeaturedReadMoreColorHover?: string,
  skhemataBlogFeaturedReadMoreBackgroundColorHover?: string,
}

const Template: Story<SkhemataBlogFeaturedArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.skhemata.com/wp-json/wp/v2',
  },
  skhemataBlogTextColor,
  skhemataBlogFeaturedTitleColor,
  skhemataBlogFeaturedReadMoreColor,
  skhemataBlogFeaturedReadMoreBackgroundColor,
  skhemataBlogFeaturedReadMoreColorHover,
  skhemataBlogFeaturedReadMoreBackgroundColorHover,
}: SkhemataBlogFeaturedArgTypes) => html`
  <style>
    body {
    --skhemata-blog-text-color: ${skhemataBlogTextColor};
    --skhemata-blog-featured-title-color: ${skhemataBlogFeaturedTitleColor};
    --skhemata-blog-featured-read-more-color: ${skhemataBlogFeaturedReadMoreColor};
    --skhemata-blog-featured-read-more-background-color: ${skhemataBlogFeaturedReadMoreBackgroundColor};
    --skhemata-blog-featured-read-more-color-hover: ${skhemataBlogFeaturedReadMoreColorHover};
    --skhemata-blog-featured-read-more-background-color-hover: ${skhemataBlogFeaturedReadMoreBackgroundColorHover};
    }
  </style>
  <skhemata-blog-featured
    .apiWordpress=${apiWordpress}
  >
  </skhemata-blog-featured>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.skhemata.com/wp-json/wp/v2'
  },
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog-featured
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(/"/g, '\\"')}"
>
</skhemata-blog-featured>
      `,
    },
  },
}
