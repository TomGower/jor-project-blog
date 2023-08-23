import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import fs from 'fs/promises';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const posts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
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
