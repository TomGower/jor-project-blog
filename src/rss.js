const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const process = require('process');

async function getBlogPostList() {
  const contentPath = path.join(process.cwd(), './content/');
  const fileNames = fs.readdirSync(contentPath, (err) => {
    if (err) console.log(err);
  });

  const blogPosts = [];

  for (let fileName of fileNames) {
    const filePath = path.join(contentPath, fileName);
    const rawContent = fs.readFileSync(filePath, 'utf-8', () => {});

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

async function generateRssFeed() {
  const site_url =
    process.env.NODE_ENV === 'production'
      ? 'https://nameofwebsite'
      : 'http://localhost:3000';

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Welcome to this blog posts!',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  const allPosts = await getBlogPostList();

  allPosts.map((p) => {
    feed.item({
      title: p.title,
      description: p.abstract,
      date: p.publishedOn,
      url: `${site_url}/posts/${p.slug}`,
    });
  });

  fs.writeFileSync(
    path.join(process.cwd(), './public/rss.xml'),
    feed.xml({ indent: true })
  );
}

generateRssFeed();
