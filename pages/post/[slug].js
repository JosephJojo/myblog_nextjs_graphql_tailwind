import React from 'react';
import { useRouter } from 'next/router';

import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader, Footer } from '../../components';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {
    const router = useRouter();

    if(router.isFallback) {
        return <Loader />
    }

    // console.log(post); // for debugging purpose

    return (
        <div className='container mx-auto px-5 md:px-10 2xl:px-28 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <AdjacentPosts slug={post.slug} createdDate={post.createdDate} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: {slug} }) => ({ params: { slug } })), // All paths will be rendered during build time. Not god if have many blog posts
        fallback: true
        // fallback false: statically generate site, but after deployment new blog posts wont be generated
        //          true: new pages will also generated even after deployment.
    }
}