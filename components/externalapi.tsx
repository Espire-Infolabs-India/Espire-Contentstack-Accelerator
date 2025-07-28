import React, { useEffect, useState } from "react";
import { fetchPosts, Post } from "../utils/data-loader/fetchexternalsource";
import { ExternalApiContentType } from "../model/component-props/externalapi.model";

const ExternalApiResults = (data: ExternalApiContentType) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api = data?.external_api;

  useEffect(() => {
    if (!api) return;

    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchPosts(api);
        setPosts(results);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [api]);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {data?.title}
      </h2>

      {loading && (
        <div className="flex justify-center my-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 text-center p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{post.body}</p>
              <div className="mt-4 text-xs text-gray-500 border-t pt-2">
                <span className="mr-4">
                  <strong>User ID:</strong> {post.userId}
                </span>
                <span>
                  <strong>Post ID:</strong> {post.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No posts available.</p>
      )}
    </div>
  );
};

export default ExternalApiResults;
