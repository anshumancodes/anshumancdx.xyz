import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import editorConfig from "../../config/BlogeditorConfig";
import { ClassicEditor } from "ckeditor5";
import {cms_db_id,blog_collection_id , db,account, client} from "../../config/appwriteconfig";
import { Permission, Role } from "appwrite";

import "ckeditor5/ckeditor5.css";


const BlogEditor = () => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [archive,setArchive]=useState(false);
  const [content, setContent] = useState("");
  const [Draft, setDraft] = useState(false);
  const [errorCreating, setErrorCreating] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

 

  const createBlog = async () => {
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
          createdAt: new Date().toISOString(), // Assuming you want to use the current date
        },
        [Permission.write(Role.user("anshumancdx"))] 
      );
      setCreatedSuccess(true);
      setErrorCreating(false);
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
  // Handle title input change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-10">
        {Draft ? (
          <span className="bg-gray-500 mt-5 px-4 py-2">
            Successfully created an article document! (draft)
          </span>
        ) : errorCreating ? (
          <span className="bg-red-500 mt-5 px-4 py-2">
            Unable to create an article document!
          </span>
        ) : (
          createdSuccess && (
            <span className="bg-green-500 mt-5 px-4 py-2">
              Successfully created an article document!
            </span>
          )
        )}
      </div>

      <div className="main-container font-lato w-fit mx-auto">
        <input
          type="text"
          placeholder="Write slug"
          className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
          onChange={handleSlugChange}
        />
        <input
          type="text"
          placeholder="Write blog title"
          className="ml-[42px] mt-5 mb-5 py-2 px-5 min-w-[795px] max-w-[795px] border border-slate-400 outline-none"
          onChange={handleTitleChange}
        />
        <div
          className="editor-container editor-container_classic-editor editor-container_include-block-toolbar min-w-[795px] max-w-[795px] ml-[42px]"
          ref={editorContainerRef}
        >
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
        <span>
          <button className="px-4 py-2 bg-green-500 ml-[42px] mt-5" onClick={createBlog}>
            Create blog
          </button>
        </span>
        <span>
          <button
            className="px-4 py-2 bg-gray-400 ml-[42px] mt-5"
            onClick={() => setDraft(true)}
          >
            Add to draft
          </button>
        </span>
      </div>
    </div>
  );
};

export default BlogEditor;
