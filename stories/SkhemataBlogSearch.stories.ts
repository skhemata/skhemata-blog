import { html } from '@skhemata/skhemata-base';
import '../skhemata-blog.js';
import { SkhemataBlogSearch } from '../src/component/SkhemataBlogSearch.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataBlog/SkhemataBlogSearch',
  component: 'skhemata-blog',
  argTypes: {
    blogPagePath: argTypes.blogPagePath, 
  },

};

const Template: Story<ArgTypes> = ({
  blogPagePath = '',
}: ArgTypes) => html`
  <skhemata-blog-search
    blogPagePath=${blogPagePath}
  >
  </skhemata-blog-search>
`;

export const Example = Template.bind({});
Example.args = {
  blogPagePath: '',
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-blog-search
  blog-page-path="${Example.args.blogPagePath}"
>
</skhemata-blog-search>
      `,
    },
  },
}