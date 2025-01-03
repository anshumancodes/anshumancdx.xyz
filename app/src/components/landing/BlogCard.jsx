import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import parse from 'html-react-parser';
const BlogCard = ({ blog }) => {



  // Function to calculate read time (assuming 200 words per minute)
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  return (
    <div className=" shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl  border-gray-600 border-2">

      <div className="py-6 px-4">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-600">{blog.content ? parse(blog.content.replace(/<figure.*?>.*?<\/figure>/, '').slice(0,100)+" ..."): "No Blog intro found"}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-3">
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            <span>anshuman</span>
          </div>
          <div className="flex items-center space-x-4">

            <span className="flex items-center">
              <Clock size={16} className="mr-1" />
              {calculateReadTime(blog.content)} min read
            </span>
          </div>
        </div>
        <a 
          href={`/blog/${blog.$id}`} 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;