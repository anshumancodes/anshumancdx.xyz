// import React from "react";
// import { collection, doc, getDocs, addDoc } from "firebase/firestore";
// import { db } from "../config/Firebase";
// import { useState } from "react";

// // import { ChakraProvider } from '@chakra-ui/react'
// import { Input } from "@chakra-ui/react";
// import { Badge } from "@chakra-ui/react";
// import { Stack } from "@chakra-ui/react";
// import { Textarea } from "@chakra-ui/react";
// import { Button, ButtonGroup } from "@chakra-ui/react";
// import {
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
// } from "@chakra-ui/react";

// const Addblogs = () => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [date, setdate] = useState("");
//   const [isAlertVisible, setAlertVisibility] = useState(false);

//   const blogsRef = collection(db, "blogs");
//   const createBlogs = async () => {
//     try {
//       const docRef = await addDoc(blogsRef, {
//         title: title,
//         content: body,
//         date: date,
//       });
//       console.log("Document written with ID: ", docRef.id);
//       setAlertVisibility(true);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <div className="flex  w-full flex-col items-center">
//       <Alert
//         status="info"
//         className="bg-info-blue text-black mt-10 py-2 px-4 rounded-basic w-200pwx flex gap-2 justify-center"
//       >
//         <AlertIcon className="w-20pwx" />
//         Create Blog
//       </Alert>

//       {/* alert on sucess  */}
//       <div>
//         {/* Conditionally render the alert based on state */}
//         {isAlertVisible && (
//           <Stack>
//             <Alert
//               status="success"
//               variant="subtle"
//               className="h-10 bg-alert-bg w-300pwx p-5 flex gap-2 "
//             >
//               <AlertIcon className="w-20pwx" />
//               <p>Data uploaded to the server. Fire on!</p>
//             </Alert>
//           </Stack>
//         )}
//       </div>
//       {/*  */}

//       <form
//         action=""
//         className="w-320pwx flex flex-col gap-3 Large:w-700pwx bg-gray-200  mt-10up p-8 rounded-medium-card"
//       >
//         <Stack className="bg-transparent flex flex-col gap-3">
//           <label htmlFor="label">blog title</label>
//           <Input
//             size="sm"
//             className="bg-white border-black border-2"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <label htmlFor="label">date</label>
//           <Input
//             size="sm"
//             className="bg-white border-black border-2"
//             value={date}
//             onChange={(e) => setdate(e.target.value)}
//           />
//         </Stack>
//         <label htmlFor="label">content</label>
//         <Textarea
//           className="bg-white h-200phx border-black border-2"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <Button
//           colorScheme="teal"
//           variant="solid"
//           className="bg-black text-white w-2/6 py-2 font-semibold rounded-basic"
//           onClick={createBlogs}
//         >
//           create
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Addblogs;
import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Alert, AlertIcon, Stack as ChakraStack } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addblogs = () => {
  const [docId, setDocId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setdate] = useState("");
  const [isAlertVisible, setAlertVisibility] = useState(false);

  const blogsRef = collection(db, "blogs");

  const createBlogs = async () => {
    try {
      const blogData = {
        title: title,
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
          className="bg-white h-200phx border-black border-2 text-black"
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
