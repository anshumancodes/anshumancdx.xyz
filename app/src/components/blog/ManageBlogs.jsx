import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState();
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [error, setError] = useState(null);
  const [deleted,setDeleted]=useState(false);
  const [archived,setArchived]=useState(false);
  const [undraft,setUndraft]=useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, "blogs");
      const blogquery = query(blogsRef, orderBy("date", "desc"));
      const blogsSnapshot = await getDocs(blogquery);
      const blogsList = blogsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      setBlogs(blogsList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please try again.");
    }
  };

  const deleteBlog = async () => {
    if (!selectedBlogId) {
      setError("Please select a blog to delete.");
      return;
    }
    try {
      await deleteDoc(doc(db, "blogs", selectedBlogId));
      setBlogs(blogs.filter((blog) => blog.id !== selectedBlogId));
      setSelectedBlogId("");
      setError(null);
      setDeleted(true)
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete the blog. Please try again.");
    }
  };

  const undraftBlog = async () => {
    if (!selectedBlogId) {
      setError("Please select a blog to undraft.");
      return;
    }
    try {
      const blogRef = doc(db, "blogs", selectedBlogId);
      await updateDoc(blogRef, { isDraft: false });
      setBlogs(blogs.map((blog) => 
        blog.id === selectedBlogId ? { ...blog, isDraft: false } : blog
      ));
      setError(null);
      setUndraft(true)
    } catch (error) {
      console.error("Error undrafting blog:", error);
      setError("Failed to undraft the blog. Please try again.");
    }
  };

  const archiveBlog = async () => {
    if (!selectedBlogId) {
      setError("Please select a blog to archive.");
      return;
    }
    try {
      const blogRef = doc(db, "blogs", selectedBlogId);
      await updateDoc(blogRef, { archive: true });
      setBlogs(blogs.map((blog) => 
        blog.id === selectedBlogId ? { ...blog, archive: true } : blog
      ));
      setError(null);
    } catch (error) {
      console.error("Error archiving blog:", error);
      setError("Failed to archive the blog. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 space-y-6 z-10">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>

        {/* Blog List Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Blog List</h2>
          <div className="h-[400px] overflow-y-auto rounded-md border border-gray-200 mt-4 p-4">
          {blogs ? (
            blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="border border-gray-500 mb-2 p-4">
                  <h2 className="text-2xl mb-2">{blog.title}</h2>
                  <span>slug/id: <span className="text-gray-500">{blog.id}</span></span>
                  <a href={`/blog/${blog.id}`} className="text-blue-500 block mt-3">Read more</a>
                  {blog.isDraft && <span className="text-yellow-600 block">Draft</span>}
                  {blog.archive && <span className="text-gray-600 block">Archived</span>}
                </div>
              ))
            ) : (
              <p className="w-full flex justify-center items-center h-full">
                No blogs available
              </p>
            )
          ) : (
            <p className="w-full flex justify-center items-center">
             Loading....
            </p>
          )}
          </div>
        </div>

        <div className="mt-5">
        {
          deleted ? <span className="bg-red-500 mt-5 px-4 py-2">
          Successfully deleted the article document!
        </span> : (
          archived ? <span className="bg-gray-500 mt-5 px-4 py-2">
          Successfully archived the article document!
        </span> : (
          undraft ? <span className="bg-green-500 mt-5 px-4 py-2">
          Successfully undrafted the article document!
        </span> : null
        )
        )
        }

        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Blog Actions</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter blog slug or ID"
              className="border p-2 w-full md:max-w-md rounded-md"
              value={selectedBlogId}
              onChange={(e) => setSelectedBlogId(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={undraftBlog}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Undraft
              </button>
              <button 
                onClick={archiveBlog}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Archive
              </button>
              <button 
                onClick={deleteBlog}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;
