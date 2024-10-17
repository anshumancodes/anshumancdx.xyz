import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import editorConfig from "./BlogeditorConfig";
import { ClassicEditor } from "ckeditor5";
import { cms_db_id, blog_collection_id, db } from "../../config/appwriteconfig";
import { Permission, Role } from "appwrite";

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
    <div className="flex flex-col justify-center items-center">
      <div className="mt-10">
        {errorCreating && (
          <span className="bg-red-500 text-white px-4 py-2">Unable to create an article document!</span>
        )}
        {createdSuccess && (
          <span className="bg-green-500 text-white px-4 py-2">Successfully created an article document!</span>
        )}
        {Draft && (
          <span className="bg-gray-500 text-white px-4 py-2">Successfully saved as draft!</span>
        )}
      </div>

      <div className="main-container font-lato w-fit mx-auto">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Write slug"
            value={slug}
            className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
            onChange={handleSlugChange}
          />
          <input
            type="text"
            placeholder="Write blog title"
            value={title}
            className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
            onChange={handleTitleChange}
          />
          <input
            type="datetime-local"
            className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
            onChange={handleDateChange}
          />
          <input
            type="url"
            className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
            placeholder="enter cover img url"
            onChange={handlecoverImgChange}
          />
        </div>

        <div className="editor-container min-w-[795px] max-w-[795px] ml-[42px]" ref={editorContainerRef}>
          <div className="editor-container__editor min-w-[795px] max-w-[795px]">
            <div ref={editorRef}>
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

        <div className="flex flex-col gap-4 mt-5">
          <button
            className="px-4 py-2 bg-green-500 text-white ml-[42px]"
            onClick={createBlog}
            disabled={!title || !content || !slug}
          >
            Create blog
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white ml-[42px]"
            onClick={() => setDraft(true)}
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;

