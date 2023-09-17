export const getAllPosts = async () => {
  const response = await fetch('https://dummyjson.com/posts?limit=200', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Unable to fetch posts.');

  return response.json();
};

export const getPostById = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Unable to fetch post.');

  return response.json();
};

export const getPostsBySearch = async (search: string) => {
  let url;

  if (search.trim() === '') {
    url = 'https://dummyjson.com/posts?limit=200';
    // url = '/api/posts';
  } else {
    url = `https://dummyjson.com/posts/search?q=${search}`;
    // url = `/api/posts?q=${search}`;
  }
  // Add some delay here.
  const [response] = await Promise.all([
    fetch(url, {
      next: { revalidate: 3600 },
    }),
    new Promise((res) => setTimeout(res, 600)),
  ]);

  if (!response.ok) throw new Error('Unable to fetch posts.');

  return await response.json();
};

export const getPostsUsers = async () => {
  const response = await fetch(`https://dummyjson.com/users?limit=200`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Unable to fetch post.');

  return response.json();
};

export const getPostUserById = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Unable to fetch post.');

  return response.json();
};
