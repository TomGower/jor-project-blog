import Link from 'next/link';
import styles from './not-found.module.css';

export default async function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2>404 Not Found</h2>
      <p>
        Why should I know? This page is not there. This file is in the src/app
        directory.
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
