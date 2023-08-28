import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const posts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
      {/* could use destructuring and { slug, ...delegated } and pass in {...delegated} to component call. Josh doesn't like that in JS because of illegibility, and I don't either. if TS will confirm that these are both the same things and throw us an error when they're not, that's safer. */}
      {posts.map((p) => (
        <BlogSummaryCard
          slug={p.slug}
          title={p.title}
          abstract={p.abstract}
          publishedOn={new Date(p.publishedOn)}
          key={p.slug}
        />
      ))}
    </div>
  );
}

export default Home;
