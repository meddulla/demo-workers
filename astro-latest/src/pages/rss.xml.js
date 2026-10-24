import rss from '@astrojs/rss';
import { getPosts, postDate, postUrl } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet',
    site: context.site,
    items: posts.map((post) => ({
      title: 'Lorem ipsum dolor sit amet',
      pubDate: postDate(post),
      link: postUrl(post)
    }))
  });
}
