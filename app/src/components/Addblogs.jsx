
import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Alert, AlertIcon, Stack as ChakraStack } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addblogs = () => {
  const [docId, setDocId] = useState("");
  const [title, setTitle] = useState("");
  const[intro,setIntro]=useState("");
  const [body, setBody] = useState("");
  const [date, setdate] = useState("");
  const [isAlertVisible, setAlertVisibility] = useState(false);

  const blogsRef = collection(db, "blogs");

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const createBlogs = async () => {
    try {
      const blogData = {
        title: title,
        intro:intro,
        content: body,
        date: date,

      };

      // Use the provided docId or let Firestore generate a new one
      const blogDocRef = doc(blogsRef, docId || undefined);

      await setDoc(blogDocRef, blogData);

      console.log("Document written with ID: ", blogDocRef.id);
      setAlertVisibility(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Alert
        status="info"
        className="bg-info-blue text-black mt-10 py-2 px-4 rounded-basic w-200pwx flex gap-2 justify-center"
      >
        <AlertIcon className="w-20pwx" />
        Create Blog
      </Alert>

      {/* Alert on success */}
      <div>
        {isAlertVisible && (
          <ChakraStack>
            <Alert
              status="success"
              variant="subtle"
              className="h-10 bg-alert-bg w-300pwx p-5 flex gap-2 text-black"
            >
              <AlertIcon className="w-20pwx" />
              <p className="text-black">Data uploaded to the server. Fire on!</p>
            </Alert>
          </ChakraStack>
        )}
      </div>

      <form
        action=""
        className="w-320pwx flex flex-col gap-3 Large:w-700pwx bg-gray-200 mt-10up p-8 rounded-medium-card"
      >
        <Stack className="bg-transparent flex flex-col gap-3">
          {/* Input for document ID */}
          <label htmlFor="label" className="text-black">Document ID (slug)</label>
          <Input
            size="sm"
            className="bg-white border-black border-2 text-black"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />
          {/* Other input fields */}
          <label htmlFor="label" className="text-black">Blog title</label>
          <Input
            size="sm"
            className="bg-white border-black border-2 text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="label" className="text-black">Blog Intro</label>
          <Input
            size="sm"
            className="bg-white border-black border-2 text-black"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <label htmlFor="label" className="text-black">Date</label>
          <Input
            size="sm"
            className="bg-white border-black border-2 text-black"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </Stack>
        {/* Input for content using React-Quill */}
        <label htmlFor="label">Content</label>
        <ReactQuill
          className="bg-white h-300phx border-black border-2 text-black"
          value={body}
          onChange={(value) => setBody(value)}
          
        />
        <Button
          colorScheme="teal"
          variant="solid"
          className="bg-black text-white w-2/6 py-2 font-semibold rounded-basic"
          onClick={createBlogs}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default Addblogs;
