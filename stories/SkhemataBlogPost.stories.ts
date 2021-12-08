import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlogPost',
  component: 'skhemata-blog',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    blogPagePath: argTypes.blogPagePath,
    navigate: argTypes.navigate,
    slug: argTypes.slug,
    skhemataBlogTextColor: argTypes.skhemataBlogTextColor,
    skhemataBlogLinkColor: argTypes.skhemataBlogLinkColor,
    skhemataBlogPostBackButtonColor: {
      name: '--skhemata-blog-post-back-button-color',
      control: 'color',
      description: 'Text color of the back button on the blog post',
      defaultValue: 'rgb(255, 255, 255)',
      table: {
        category: 'CSS Properties',
        type: 'color'
      }
    },
    skhemataBlogPostBackButtonBackgroundColor: {
      name: '--skhemata-blog-post-back-button-background-color',
      control: 'color',
      description: 'Background color of the back button on the blog post',
      defaultValue: 'rgb(50, 115, 220)',
      table: {
        category: 'CSS Properties',
        type: 'color'
      }
    },
    skhemataBlogPostSocialIconColor: {
      name: '--skhemata-blog-post-social-icon-color',
      control: 'color',
      description: 'Color of the social media icons',
      defaultValue: 'rgb(242, 113, 28)',
      table: {
        category: 'CSS Properties',
        type: 'color'
      }
    },
    skhemataBlogPostHeadingColor: {
      name: '--skhemata-blog-post-heading-color',
      control: 'color',
      description: 'Color of the content headings',
      defaultValue: 'rgb(54, 54, 54)',
      table: {
        category: 'CSS Properties',
        type: 'color'
      }
    },
  },
};

interface SkhemataBlogPostArgTypes extends ArgTypes {
  skhemataBlogPostHeadingColor?: string,
  skhemataBlogPostBackButtonColor?: string,
  skhemataBlogPostBackButtonBackgroundColor?: string,
  skhemataBlogPostSocialIconColor?: string,
}

const Template: Story<SkhemataBlogPostArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.skhemata.com/wp-json/wp/v2'
  },
  blogPagePath = '',
  slug = 'creating-a-crowdfunding-marketplace-for-no-code-entrepreneurs',
  skhemataBlogTextColor,
  skhemataBlogLinkColor,
  skhemataBlogPostHeadingColor,
  skhemataBlogPostSocialIconColor,
  skhemataBlogPostBackButtonColor,
  skhemataBlogPostBackButtonBackgroundColor,

}: SkhemataBlogPostArgTypes) => html`
  <style>
  body {
    --skhemata-blog-link-color: ${skhemataBlogLinkColor};
    --skhemata-blog-text-color: ${skhemataBlogTextColor};
    --skhemata-blog-post-heading-color: ${skhemataBlogPostHeadingColor};
    --skhemata-blog-post-social-icon-color: ${skhemataBlogPostSocialIconColor};
    --skhemata-blog-post-back-button-color: ${skhemataBlogPostBackButtonColor};
    --skhemata-blog-post-back-button-background-color: ${skhemataBlogPostBackButtonBackgroundColor};
  }
  </style>
  <skhemata-blog-post
    .apiWordpress=${apiWordpress}
    .blogPagePath=${blogPagePath}
    .slug=${slug}
  >
  </skhemata-blog>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.skhemata.com/wp-json/wp/v2'
  },
  slug: 'creating-a-crowdfunding-marketplace-for-no-code-entrepreneurs',
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog-post
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(/"/g, '\\"')}"
  slug="${Example.args.slug}"
>
</skhemata-blog-post>
      `,
    },
  },
}
