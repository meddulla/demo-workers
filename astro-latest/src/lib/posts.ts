import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

// Hugo takes the date from the filename first (hugo.toml: date = [':filename', ':default'])
export const postDate = (post: Post) => {
  const m = post.id.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : post.data.date;
};

export const postSlug = (post: Post) => post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');

export const postUrl = (post: Post) => {
  const d = postDate(post);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `/posts/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${postSlug(post)}/`;
};

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(d);

export const getPosts = async () =>
  (await getCollection('posts')).sort((a, b) => postDate(b).valueOf() - postDate(a).valueOf());

// Hugo's automatic summary: whole top-level blocks until 70 words are reached
export const summary = (html: string, words = 70) => {
  const blocks = html.match(/<(\w+)[^>]*>[\s\S]*?<\/\1>|<[^>]+\/?>/g) ?? [];
  let count = 0;
  const out: string[] = [];
  for (const block of blocks) {
    out.push(block);
    count += block.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (count >= words) break;
  }
  return out.join('\n');
};
