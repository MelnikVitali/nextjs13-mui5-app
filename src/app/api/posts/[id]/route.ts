import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { posts } from '../posts';

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params: { id } }: Params) => {
  const currentPosts = posts.find((post) => post.id === Number(id));

  if (currentPosts) {
    return NextResponse.json(currentPosts);
  } else {
    redirect('/blog');
  }
};

export const DELETE = async (req: Request, { params: { id } }: Params) => {
  const headerList = headers();
  const type = headerList.get('Content-Type');

  const cookiesList = cookies();
  const coo2 = cookiesList.get('Cookie_2')?.value;

  // logic delete post
  // redirect('/blog')

  return NextResponse.json({ id, type, coo2 });
};
