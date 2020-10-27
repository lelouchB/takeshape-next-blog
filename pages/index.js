// pages/index.js
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import PostContainer from "../components/post-container";
import { getAllPosts } from "../lib/api";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>TakeShape Blog with NextJS</title>
      </Head>
      <Header title="TakeShape Blog with NextJS" />
      {posts.map((post) => (
        <PostContainer
          key={post._id}
          title={post.title}
          slug={post.slug}
          author={post.author}
          deck={post.deck}
        />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
