import { blogPosts as manualPosts, BlogPost } from './manualPosts';
import generatedPostsRaw from './generatedPosts.json';

const techImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
  'https://images.unsplash.com/photo-1551434678-e076c223a692',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
].map(url => `${url}?auto=format&fit=crop&q=80&w=800`);

const getDeterministicImage = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return techImages[Math.abs(hash) % techImages.length];
};

const generatedPosts: BlogPost[] = (generatedPostsRaw as BlogPost[]).map(post => ({
  ...post,
  category: post.category as 'Engineering' | 'Product' | 'Company',
  // Override repeated images with deterministic ones from our set
  image: getDeterministicImage(post.id)
}));

export const blogPosts: BlogPost[] = [...manualPosts, ...generatedPosts].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export type { BlogPost };
