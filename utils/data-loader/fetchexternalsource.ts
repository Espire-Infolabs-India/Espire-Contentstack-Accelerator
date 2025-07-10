export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async (url: string): Promise<Post[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return await response.json();
};
