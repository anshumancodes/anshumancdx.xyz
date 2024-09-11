
import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import RepoCard from "./RepoCard";
import BlogCard from "./BlogCard";
import { db } from "../../config/Firebase";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import Footer from "../Footer";
import { ArrowUpRightFromCircle } from "lucide-react";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlog] = useState();

  // Update this array with the actual names of repositories you want to display
  const selectedRepoNames = ["youtube-backend", "youtube-client"]; // Replace with your desired repo names

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

          if (data.length === 0) {
            break; // No more repos to fetch
          }

          allRepos = [...allRepos, ...data];
          page++;

          // Check if we've fetched all repos (in case the total is exactly a multiple of 100)
          const linkHeader = response.headers.get("Link");
          if (!linkHeader || !linkHeader.includes('rel="next"')) {
            break;
          }
        }

        console.log("Fetched Repos:", allRepos);
        setRepos(allRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setError("Failed to fetch repositories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, []);

  // Filter only the selected repos based on the passed names
  const filteredRepos = repos.filter((repo) =>
    selectedRepoNames.includes(repo.name)
  );

  useEffect(() => {
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

        setBlog(blogsList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="">
      <Nav />
      <div className="flex flex-col  justify-center px-5 md:px-[200px] lg:px-[400px] mt-10">
        <div>
          <h1 className="text-4xl font-bold">Hey there, it's Anshuman</h1>
          <p className="text-gray-700 lg:w-[600px] flex flex-wrap">Software developer from India. Working with JavaScript and Python. Currently exploring more CS concepts and building projects(checkout those on github). </p>
           <p className="flex flex-wrap gap-1 mt-2">Want to Hire me as a freelance developer? ,<ArrowUpRightFromCircle/><a href="/business" className="underline">/businesss</a></p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured Projects
          </h2>
          {loading ? (
            <p>Loading repositories...</p>
          ) : error ? (
            <p>{error}</p>
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

        <div className="mt-8 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"></h2>

          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
              Latest Blog Posts
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
{blogs && blogs.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {blogs.slice(-3).map(blog => (
      <BlogCard key={blog.id} blog={blog} />
    ))}
  </div>
) : (
  <p className="text-gray-600 text-center">No blog posts available at the moment.</p>
)}
</div>

        </div>
      </div>
      <Footer/>
    </main>
   
  );
};

export default Home;
