import { posts } from '@/data/posts';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('q');

  let currentPosts = posts;

  if (query) {
    currentPosts = posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }

  return NextResponse.json(currentPosts);
};

export const POST = async (req: Request) => {
  const body = await req.json();

  // console.log(body);

  return NextResponse.json({ body });
};
