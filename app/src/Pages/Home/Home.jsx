import React, { useState, useEffect } from "react";
import { db, cms_db_id, blog_collection_id } from "../../config/appwriteconfig";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Dribbble,
  MessageCircle,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import Newsletter from "../../components/blog/Newsletter";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicationId=import.meta.env.VITE_PUBLICATION_ID;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    let isMounted = true; // Prevent state updates if unmounted
  
    const fetchBlogs = async () => {
      try {
        const response = await db.listDocuments(cms_db_id, blog_collection_id);
  
        if (isMounted) {
          const sortedBlogs = response.documents
            .slice() // Avoid mutating the original array
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
          setBlogs(sortedBlogs.slice(0, 4));
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
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  }, []); // ✅ Removed `[blogs]` dependency to prevent infinite loop
  
  

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Welcome Card - spans 8 columns */}
        <div className="md:col-span-8 bg-zinc-900 rounded-lg p-6 flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="text-zinc-500 text-sm mb-2">Welcome</div>
            <h1 className="text-2xl mb-2">
              Hey there, I am{" "}
              <span className="text-white font-bold">Anshuman Praharaj</span>
            </h1>
            <p className="text-zinc-400">
              Software developer from India, working with JavaScript and Python.
              Exploring core CS concepts, while building cool projects—check
              them out on
              <Link to="https://github.com/anshumancodes">
                {" "}
                <span className="text-green-500 underline">GitHub!</span>
              </Link>
            </p>

            {/* Social Links */}
            <div className="flex space-x-2 mt-6">
              <a
                href="https://github.com/anshumancodes"
                className="w-10 h-10 flex items-center justify-center rounded border border-blue-500 text-white"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/anshumancdx/"
                className="w-10 h-10 flex items-center justify-center rounded border border-blue-500 text-white"
                
              >
                <Linkedin size={18} />
              </a>

              
             
             
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img
                src="https://res.cloudinary.com/denzlvzte/image/upload/v1743449060/m3g7hrf1zicbp0p1ot1a.png"
                alt="Anshuman's profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* About Me Card - spans 4 columns */}
        <div className="md:col-span-4 bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">About me</h2>
          <p className="text-sm text-zinc-400 mb-2">
            Hi, I'm Anshuman, a software developer from India. My primary tools
            of choice includes:
          </p>
          <ul className="space-y-1 mb-4">
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
              JavaScript
            </li>
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
              React
            </li>
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
              Express
            </li>
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-blue-700 rounded-full mr-2"></span>
              postgres
            </li>
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
              MongoDB
            </li>
            <li className="flex items-center text-sm">
              <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
              Nodejs
            </li>
          </ul>
          <p className="text-sm text-zinc-400">
            Beyond coding, I'm passionate about contributing to tech
            communities, exploring new technologies, read blogs etc.
          </p>
        </div>

        {/* Contact Card */}
        <div className="md:col-span-3 bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Let's start working together!
          </h2>
          <div className="mb-6">
            <div className="text-zinc-500 text-sm mb-1">Contact Details</div>
            <div className="text-zinc-300">anshumanprof01@gmail.com</div>
            <div className="text-zinc-300">India</div>
          </div>
          <div>
            <div className="text-zinc-500 text-sm mb-1">Socials</div>
            <a
              href="https://www.linkedin.com/in/anshumancdx/"
              className="block text-zinc-300 hover:text-white"
            >
              Linkedin
            </a>
            <a
              href="https://github.com/anshumancodes"
              className="block text-zinc-300 hover:text-white"
            >
              Github
            </a>
            <a
              href="https://hashnode.com/@anshcds"
              className="block text-zinc-300 hover:text-white"
            >
              Hashnode
            </a>
            <a
              href="https://discord.com/users/thelazymonkee"
              className="block text-zinc-300 hover:text-white"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Time zone Card */}
        <div className="md:col-span-3 grid grid-rows-2 gap-4 px-2">
          <div className="bg-zinc-900 rounded-lg p-2">
            <div className="text-xl font-bold mb-2">Time zone</div>
            <div className="text-2xl font-light text-center text-white flex items-start">
              {formattedTime} IST
            </div>
          </div>
          <div className="relative bg-zinc-900 rounded-lg p-2 flex items-center justify-center">
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJ1ZDV5YWlpd2Njd2h2dXBoaWwxaHF2d2kzbGhleWVkZnI5ZWxtbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ws6T5PN7wHv3cY8xy8/giphy.gif"
              alt="Github Animation"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold flex gap-2 text-white z-10">
                github <ArrowUpRight />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Card */}
        <div className="md:col-span-6 bg-zinc-900 rounded-lg p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium">Blog</h2>
            <Link to="/blog">
              <ExternalLink size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton: three placeholder items
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="border-b border-dotted border-gray-500"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.$id}>
                  <Link
                    to={`/blog/${blog.$id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <p className="text-zinc-300">{blog.title}</p>
                  </Link>
                  <div className="border-b border-dotted border-zinc-700 mt-1 mb-1"></div>
                  <p className="text-xs text-zinc-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>Error loading</p>
            )}
          </div>
        </div>
        {/* Status Card */}
        <div className="md:col-span-6 bg-zinc-900 rounded-lg p-6">
        <Newsletter publicationId={publicationId}/>
        </div>

        {/* Footer */}
        <div className="md:col-span-6 bg-zinc-900 rounded-lg p-4 flex items-center justify-center">
          <div className="text-xs text-zinc-500">
            © {new Date().getFullYear()} · Crafted with ♥ using React by Anshuman.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
