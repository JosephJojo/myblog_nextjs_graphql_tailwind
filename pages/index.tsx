import type { NextPage } from 'next'
import Head from 'next/head'
import { getPosts } from '../services';

import { PostCard, Categories, PostWidget } from '../components'

// const posts = [
//   { title: 'Sample Title 01', excerpt: 'Sample Excerpt 01' },
//   { title: 'Sample Title 02', excerpt: 'Sample Excerpt 02' },
// ];

const Home: NextPage = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Joseph's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
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

    </div>
  )
}

export default Home

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts }
  }
}