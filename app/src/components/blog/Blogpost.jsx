import { useState, useEffect ,useContext} from "react";
import ShareButton from "./ShareButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { db, cms_db_id, blog_collection_id } from "../../config/appwriteconfig";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogUrl = `${window.location.origin}/blog/${slug }`;
  const { isDarkMode } = useContext(DarkModeContext);
 

  const calculateReadingTime = (text) => {
    if (!text) return 1;
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Check if slug exists, use a default if not
        
        // Fetch blog where document ID matches the slug
        const blogData = await db.getDocument(cms_db_id, blog_collection_id, slug);
        setBlog(blogData);
        setReadingTime(calculateReadingTime(blogData.content));
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Better loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        <div className={`${isDarkMode ? "prose-invert" : ""}mb-12 `}>
          <Link
            to="/"
            className="inline-flex items-center text-sm py-1 px-3 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
          >
            <IoIosArrowRoundBack size={20} className="mr-1" />
            Back
          </Link>
        </div>
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-48 bg-gray-800 rounded"></div>
          <div className="h-12 bg-gray-800 rounded w-full"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-800 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Better error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-sm py-1 px-3 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
          >
            <IoIosArrowRoundBack size={20} className="mr-1" />
            Back
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col min-h-screen">
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm py-1 px-3 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
        >
          <IoIosArrowRoundBack size={20} className="mr-1" />
          Back
        </Link>
      </div>

      <article className="flex-1">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-blue-500">—</span>
              <time dateTime={blog?.date || "2023-01-21"}>
                {blog?.date || "January 21, 2023"}
              </time>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
            <ShareButton url={blogUrl} title={blog?.title || "Blog Post"} />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            {blog?.title || "Hello, World | Gianmarco Cavallo"}
          </h1>
        </header>

        <div className="space-y-6 text-lg">
          {blog?.content ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Hi there!</h2>
              <p>This Markdown file creates a page at <span className="highlight">your-domain.com/blog/post1</span></p>
              <p>It probably isn't styled much, but Markdown does support:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>bold</strong> and <em>italics</em>.</li>
                <li>lists</li>
                <li><a href="#" className="text-blue-400 hover:underline">links</a></li>
                <li>and more!</li>
              </ul>
            </>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;

