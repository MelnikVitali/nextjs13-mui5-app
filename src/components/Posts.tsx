'use client';
import useSWR from 'swr';
import { getAllPosts, getPostsBySearch } from '@/services/getPosts';
// import { shallow } from "zustand/shallow";
// import { usePosts } from "@/store";
// import { useEffect } from "react";
import Link from 'next/link';
import { useState } from 'react';

const Posts = () => {
    const [search, setSearch] = useState('');
    const { data: posts, isLoading } = useSWR(search.trim() === '' ? ' ' : search, getPostsBySearch, {
        keepPreviousData: true,
    });
    //use of zustand
    // const [posts, isLoading, getAllPosts] = usePosts(
    //     (state) => [state.posts, state.isLoading, state.getAllPosts],
    //     shallow
    // );

    // useEffect(() => {
    //     getAllPosts();
    // }, [getAllPosts]);
    // if (!posts || posts?.length == 0) {
    //     return <h3>There are no posts!</h3>;
    // }

    return (
        <>
            <div className='search-container'>
                <input
                    type='search'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search Posts...'
                    autoFocus
                />
            </div>

            <div className={isLoading ? "loading" : ""}>

                <ul>
                    {posts ? (
                        posts.map((post: any) => (
                            <li key={post.id}>
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </li>
                        ))
                    ) : (
                        null
                    )}
                </ul>
                {posts?.length === 0 && !isLoading && (<h3 style={{ marginLeft: '20px' }}>There are no posts!</h3>)}
            </div >
        </>
    );
};

export default Posts;
