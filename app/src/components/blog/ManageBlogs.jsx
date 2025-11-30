import React, { useState, useEffect } from "react";
import { db, cms_db_id, blog_collection_id } from "../../config/appwriteconfig";
import { Trash2, Archive, FileEdit, RefreshCw, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await db.listDocuments(cms_db_id, blog_collection_id);
      setBlogs(response.documents);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please try again.");
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      await db.deleteDocument(cms_db_id, blog_collection_id, id);
      setBlogs(blogs.filter((blog) => blog.$id !== id));
      showSuccess("Successfully deleted the article!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete the blog. Please try again.");
    }
  };

  const undraftBlog = async (id) => {
    try {
      await db.updateDocument(cms_db_id, blog_collection_id, id, { Draft: false });
      setBlogs(blogs.map((blog) => 
        blog.$id === id ? { ...blog, Draft: false } : blog
      ));
      showSuccess("Successfully published the article!");
    } catch (error) {
      console.error("Error undrafting blog:", error);
      setError("Failed to undraft the blog. Please try again.");
    }
  };

  const archiveBlog = async (id) => {
    try {
      await db.updateDocument(cms_db_id, blog_collection_id, id, { archive: true });
      setBlogs(blogs.map((blog) => 
        blog.$id === id ? { ...blog, archive: true } : blog
      ));
      showSuccess("Successfully archived the article!");
    } catch (error) {
      console.error("Error archiving blog:", error);
      setError("Failed to archive the blog. Please try again.");
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.$id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex-1 p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Blogs</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">View, edit, and manage your content.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in">
            {error}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.$id} className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-zinc-700 overflow-hidden flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      {blog.Draft && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Draft
                        </span>
                      )}
                      {blog.archive && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Archived
                        </span>
                      )}
                      {!blog.Draft && !blog.archive && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Published
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-mono" title="Blog ID">
                      {blog.$id.substring(0, 8)}...
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white" title={blog.title}>
                    {blog.title}
                  </h3>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Created: {new Date(blog.$createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="bg-gray-50 dark:bg-zinc-800/50 px-5 py-3 border-t border-gray-200 dark:border-zinc-700 flex justify-between items-center">
                  <Link 
                    to={`/blog/${blog.$id}`} 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    View <ExternalLink size={14} />
                  </Link>
                  
                  <div className="flex gap-2">
                    {blog.Draft && (
                      <button 
                        onClick={() => undraftBlog(blog.$id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Publish (Undraft)"
                      >
                        <RefreshCw size={18} />
                      </button>
                    )}
                    
                    {!blog.archive && (
                      <button 
                        onClick={() => archiveBlog(blog.$id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        title="Archive"
                      >
                        <Archive size={18} />
                      </button>
                    )}

                    <button 
                      onClick={() => deleteBlog(blog.$id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg">No blogs found.</p>
              {searchQuery && <p className="text-sm">Try adjusting your search terms.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
