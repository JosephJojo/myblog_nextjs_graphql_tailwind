import type { NextPage } from 'next'
import Head from 'next/head'
import { getPosts } from '../services';

import { PostCard, Categories, PostWidget, Footer } from '../components'
import { FeaturedPosts } from '../sections';

// const posts = [
//   { title: 'Sample Title 01', excerpt: 'Sample Excerpt 01' },
//   { title: 'Sample Title 02', excerpt: 'Sample Excerpt 02' },
// ];

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto px-5 md:px-10 2xl:px-28 mb-8">
      <Head>
        <title>Joseph's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8'>
        <div className='lg:col-span-8 col-span-1'>
          {/* {
            posts.map((post, index) => (
              <div key={index}>
                {post.title}
                {post.excerpt}
              </div>
            )) 
          } */}
          { posts.map((post, index) => <PostCard post={post.node} key={index} />) }
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const data = (await getPosts()) || []

  return {
    props: { posts: data },
    revalidate: 10, // Regenerate page within 10 seconds after the new request made
  }
}