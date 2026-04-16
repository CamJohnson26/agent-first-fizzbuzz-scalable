import { blogPosts as manualPosts, BlogPost } from './manualPosts';
import generatedPostsRaw from './generatedPosts.json';

const generatedPosts: BlogPost[] = (generatedPostsRaw as any[]).map(post => ({
  ...post,
  category: post.category as 'Engineering' | 'Product' | 'Company'
}));

export const blogPosts: BlogPost[] = [...manualPosts, ...generatedPosts].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export type { BlogPost };
