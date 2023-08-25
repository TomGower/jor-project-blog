import React from 'react';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import { BLOG_TITLE } from '@/constants';

const CodeSnippet = dynamic(() => import('@/components/CodeSnippet'));
const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);
const CircularColorsDemo = dynamic(() =>
  import('@/components/CircularColorsDemo')
);

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) return {};

  const { frontmatter } = post;

  return {
    description: frontmatter.abstract,
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={new Date(post.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
