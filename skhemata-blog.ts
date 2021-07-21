import { SkhemataBlog } from './src/SkhemataBlog';
import { SkhemataBlogPost } from './src/component/SkhemataBlogPost';
import { SkhemataBlogList } from './src/component/SkhemataBlogList';
import { SkhemataBlogSearch } from './src/component/SkhemataBlogSearch';
import { SkhemataBlogCategories } from './src/component/SkhemataBlogCategories';
import { SkhemataBlogFeatured } from './src/component/SkhemataBlogFeatured';

window.customElements.define('skhemata-blog', SkhemataBlog);
window.customElements.define('skhemata-blog-post', SkhemataBlogPost);
window.customElements.define('skhemata-blog-search', SkhemataBlogSearch);
window.customElements.define('skhemata-blog-list', SkhemataBlogList);
window.customElements.define('skhemata-blog-categories', SkhemataBlogCategories)
window.customElements.define('skhemata-blog-featured', SkhemataBlogFeatured);