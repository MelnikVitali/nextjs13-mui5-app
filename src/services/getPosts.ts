export const getAllPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Unable to fetch posts.');

  return response.json();
};

export const getPostById = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) throw new Error('Unable to fetch post.');

  return response.json();
};

export const getPostsBySearch = async (search: string) => {
  let url;

  if (search.trim() === '') {
    url = 'https://jsonplaceholder.typicode.com/posts';
  } else {
    url = `https://jsonplaceholder.typicode.com/posts?q=${search}`;
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
