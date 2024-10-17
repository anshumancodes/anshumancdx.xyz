import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import BlogCard from "../../components/landing/BlogCard";
import RepoCard from "../../components/landing/RepoCard";
import Footer from "../../components/Footer";
import { db, cms_db_id, blog_collection_id } from "../../config/appwriteconfig";
import { ArrowUpRightFromCircle } from "lucide-react";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repoError, setRepoError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState(null);

  const selectedRepoNames = ["youtube-backend", "youtube-client"]; // Example repos

  // Fetching GitHub Repos
  useEffect(() => {
    const fetchAllRepos = async () => {
      setLoading(true);
      let page = 1;
      let allRepos = [];

      try {
        while (true) {
          const response = await fetch(
            `https://api.github.com/users/anshumancodes/repos?per_page=100&page=${page}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.length === 0) break;

          allRepos = [...allRepos, ...data];
          page++;

          // Check if we've fetched all repos (in case the total is exactly a multiple of 100)
          const linkHeader = response.headers.get("Link");
          if (!linkHeader || !linkHeader.includes('rel="next"')) {
            break;
          }
        }

        setRepos(allRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setRepoError("Failed to fetch repositories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, []);

  const filteredRepos = repos.filter((repo) => selectedRepoNames.includes(repo.name));

  // Fetching Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogLoading(true);
      try {
        const response = await db.listDocuments(cms_db_id, blog_collection_id);
        setBlogs(response.documents);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogError("Failed to fetch blogs. Please try again.");
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="">
      <Nav />
      <div className="flex flex-col justify-center px-5 md:px-[200px] lg:px-[400px] mt-10">
        <div>
          <h1 className="text-4xl font-bold">Hey there, it's Anshuman</h1>
          <p className="lg:w-[600px] mt-2">
            Software developer from India. Working with JavaScript and Python. Currently exploring core CS concepts and building projects (checkout those on GitHub).
          </p>
          <p className="flex gap-1 mt-2">
            Want to hire me as a freelance developer?
            <ArrowUpRightFromCircle />
            <a href="/business" className="underline">/business</a>
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
          {loading ? (
            <p>Loading repositories...</p>
          ) : repoError ? (
            <p>{repoError}</p>
          ) : (
            <div>
              {filteredRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No selected repositories found. Check selectedRepoNames array.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Latest Blog Posts */}
        <div className="mt-8 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Latest Blog Posts
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          {blogLoading ? (
            <p>Loading blogs...</p>
          ) : blogError ? (
            <p className="text-center">{blogError}</p>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(-3).map((blog) => (
                <BlogCard key={blog.$id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No blog posts available at the moment.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
