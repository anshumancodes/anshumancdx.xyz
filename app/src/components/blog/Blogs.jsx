import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, cms_db_id, blog_collection_id } from "../../config/appwriteconfig";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if unmounted
  
    const fetchBlogs = async () => {
      try {
        const response = await db.listDocuments(cms_db_id, blog_collection_id);
  
        if (isMounted) {
          const sortedBlogs = response.documents
            .slice() // Prevent mutation of the original array
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
          setBlogs(sortedBlogs);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching blogs:", error);
          setError("Failed to fetch blogs. Please try again.");
          setLoading(false);
        }
      }
    };
  
    fetchBlogs();
  
    return () => {
      isMounted = false; // Cleanup
    };
  }, []);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-block px-4 py-2 mb-8 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Back
          </Link>
          <h1 className="text-4xl font-bold mb-8">Posts</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b border-dotted border-gray-700"
              >
                <div className="bg-gray-800 h-6 w-32 rounded animate-pulse"></div>
                <div className="bg-gray-800 h-4 w-24 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-block px-4 py-2 mb-8 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Back
          </Link>
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-block px-4 py-2 mb-8 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Back
        </Link>

        {/* Posts header */}
        <h1 className="text-4xl font-bold mb-8">Posts</h1>

        {/* Posts list */}
        <div className="space-y-1">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.$id}
                className="flex justify-between items-center py-3 border-b border-dotted border-gray-700"
              >
                <Link
                  to={`/blog/${blog.$id}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {blog.title}
                </Link>
                <span className="text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))
          ) : (
            <div>
              <p className="text-center py-4 text-gray-400">
                No posts available
              </p>
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h2 className="text-xl font-semibold mb-4">
                  Something went wrong
                </h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                > 
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
