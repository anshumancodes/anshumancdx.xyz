import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import editorConfig from "./BlogeditorConfig";
import { ClassicEditor } from "ckeditor5";
import { cms_db_id, blog_collection_id, db } from "../../config/appwriteconfig";
import { Permission, Role } from "appwrite";
import { Save, FileText, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

import "ckeditor5/ckeditor5.css";

const BlogEditor = () => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [archive, setArchive] = useState(false);
  const [content, setContent] = useState("");
  const [Draft, setDraft] = useState(false);
  const [errorCreating, setErrorCreating] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [createdDate, setCreatedDate] = useState(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const createBlog = async () => {
    if (!title || !content || !createdDate) {
      setErrorCreating(true);
      return;
    }

    try {
      const response = await db.createDocument(
        cms_db_id,
        blog_collection_id,
        slug,
        {
          title,
          content,
          Draft,
          archive,
          createdAt: createdDate || new Date().toISOString(), // Use current date if not set
          coverImg,
        },
        [Permission.write(Role.user("anshumancdx"))]
      );

      setCreatedSuccess(true);
      setErrorCreating(false);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setCreatedSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setErrorCreating(true);
      setCreatedSuccess(false);
    }
  };

  // Handle slug input change
  const handleSlugChange = (event) => {
    setSlug(event.target.value);
  };

  // Auto-generate slug from title
  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    setSlug(value.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, ""));
  };

  const handleDateChange = (event) => {
    setCreatedDate(event.target.value);
  };
  const handlecoverImgChange=(event)=>{
    setCoverImg(event.target.value);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900 p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Write and publish your latest thoughts.</p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors font-medium"
              onClick={() => setDraft(true)}
            >
              <Save size={18} />
              Save Draft
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={createBlog}
              disabled={!title || !content || !slug}
            >
              <FileText size={18} />
              Publish Post
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          {errorCreating && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in">
              Unable to create article! Please check all fields.
            </div>
          )}
          {createdSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in">
              Successfully created the article!
            </div>
          )}
          {Draft && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative animate-fade-in">
              Draft saved successfully!
            </div>
          )}
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title..."
                value={title}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleTitleChange}
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug (URL)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="post-url-slug"
                  value={slug}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                  onChange={handleSlugChange}
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Publish Date
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleDateChange}
              />
            </div>

            {/* Cover Image */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                  onChange={handlecoverImgChange}
                />
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="prose-editor">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <div className="editor-container border border-gray-300 dark:border-zinc-600 rounded-lg overflow-hidden" ref={editorContainerRef}>
              <div className="editor-container__editor" ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={(event, editor) => setContent(editor.getData())}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
