
import  React,{ useState } from 'react';
import Texteditor from './Texteditor';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Alert, AlertIcon, Stack as ChakraStack } from "@chakra-ui/react";
const Addblogs = () => {
  const [docId, setDocId] = useState("");
  const [title, setTitle] = useState("");
  const[intro,setIntro]=useState("");
  const [body, setBody] = useState("");
  const [date, setdate] = useState("");
  const [isAlertVisible, setAlertVisibility] = useState(false);
  const [primaryimg,Setprimaryimg] = useState("");

  const blogsRef = collection(db, "blogs");

  const createBlogs = async () => {
    try {
      const blogData = {
        title: title,
        intro:intro,
        content: body,
        date: date,
        primaryimg:primaryimg,

      };

      // Use the provided docId or let Firestore generate a new one
      const blogDocRef = doc(blogsRef, docId || undefined);

      await setDoc(blogDocRef, blogData);

      console.log("Document written with ID: ", blogDocRef.id);
      setAlertVisibility(true);
    } catch (error) {
      alert("unable to create!")
    }
  };
  return (
    <div className='flex flex-col gap-4 items-center w-full outline-none h-fit bg-black-bg'>

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
      <h1 className='w-80c text-2xl font-mono mt-10up '>Create new blog</h1>
      <div className='w-80c flex flex-col items-start  gap-4'>

       <div className='flex flex-col gap-1 w-300pwx'>
       <label htmlFor="label">Enter slug/docid</label>
      <input type="text" name="slug" id="slug" className='outline-none text-black'  value={docId}
            onChange={(e) => setDocId(e.target.value)} />
       </div>
       <div className='flex flex-col gap-1 w-300pwx'>
       <label htmlFor="label">Enter title</label>
      <input type="text" name="title" id="title" className='outline-none text-black'  value={title}
            onChange={(e) => setTitle(e.target.value)} />
       </div>
       <div className='flex flex-col gap-1 w-300pwx'>
       <label htmlFor="label">Enter main img url</label>
      <input type="text" name="primaryimg" id="img url" className='outline-none text-black'  value={primaryimg}
            onChange={(e) => Setprimaryimg(e.target.value)} />
       </div>
      
       <div className='flex flex-col gap-1 w-300pwx'>
       <label htmlFor="label">Enter date</label>
      <input type="text" name="date" id="date" className='outline-none text-black'  value={date}
            onChange={(e) => setdate(e.target.value)} />
       </div>

       <div className='flex flex-col gap-1 w-320pwx' >
       <label htmlFor="label">Enter intro</label>
      <textarea name="" id="" cols="30" rows="2" className='outline-none text-black'  value={intro}
            onChange={(e) => setIntro(e.target.value)} ></textarea>
       </div>
      <label htmlFor="label">content</label>
      <Texteditor  value={body}
          onChange={(value) => setBody(value)}/>
      <button className='bg-green-500 p-2 text-black' onClick={createBlogs}>Submit blog</button>
      </div>
      
    </div>
  )
}

export default Addblogs
