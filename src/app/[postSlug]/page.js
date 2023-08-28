import React from 'react';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import { BLOG_TITLE } from '@/constants';

// alternative to doing this here: change the default export from the index.js file
// then you can just import the component the normal way and not do the dynamic importing here
const CodeSnippet = dynamic(() => import('@/components/CodeSnippet'));
const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);
const CircularColorsDemo = dynamic(() =>
  import('@/components/CircularColorsDemo')
);
// also, we have 3 components here, but if you have a big blog with 100 bespoke components, this file would be rather extreme (like Josh's blog)
// Josh uses a separate file, helpers/mdx-components.js
// that file imports the components from the '@/components/Blah' and exports a `COMPONENT_MAP` with all the components
// this file then imports COMPONENT_MAP and passes it to MDXRemote below

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
