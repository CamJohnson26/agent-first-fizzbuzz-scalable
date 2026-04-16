const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const outputDir = path.join(projectRoot, 'apps/marketing-landing-page/src/data');
const outputFile = path.join(outputDir, 'generatedPosts.json');

const directories = [
  { path: 'docs/adr', category: 'Engineering', type: 'ADR', image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800' },
  { path: 'docs/rfc', category: 'Engineering', type: 'RFC', image: 'https://images.unsplash.com/photo-1454165833767-027ff33026b6?auto=format&fit=crop&q=80&w=800' },
  { path: 'RCAs', category: 'Company', type: 'RCA', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800' }
];

function extractDate(content) {
  const dateRegex = /\b(202\d-\d{2}-\d{2})\b/;
  const match = content.match(dateRegex);
  return match ? match[1] : '2026-04-14';
}

function extractTitle(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : 'Untitled Post';
}

function extractStatus(content) {
  const statusMatch = content.match(/## Status\n([^\n]+)/);
  return statusMatch ? statusMatch[1].trim() : 'Published';
}

function extractExcerpt(content) {
  // Extract first paragraph after title
  const paragraphs = content.split('\n\n').filter(p => !p.startsWith('#') && p.trim().length > 0);
  if (paragraphs.length > 0) {
    let excerpt = paragraphs[0].replace(/[#*`]/g, '').trim();
    if (excerpt.length > 160) excerpt = excerpt.substring(0, 157) + '...';
    return excerpt;
  }
  return 'Read our latest technical documentation and architecture decisions.';
}

function generateSlug(filename) {
  return filename.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const posts = [];

directories.forEach(dir => {
  const dirPath = path.join(projectRoot, dir.path);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    posts.push({
      id: generateSlug(file),
      title: extractTitle(content),
      excerpt: extractExcerpt(content),
      category: dir.category,
      type: dir.type,
      status: extractStatus(content),
      date: extractDate(content),
      author: 'FizzBuzz Bot',
      content: content,
      isMarkdown: true,
      image: dir.image,
      tags: [dir.type, dir.category],
      slug: generateSlug(file)
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated ${posts.length} blog posts to ${outputFile}`);
