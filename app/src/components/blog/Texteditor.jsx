import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import editorapi from "../../config/editorapi"

const Texteditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const isInitialMount = useRef(true);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (content, editor) => {
    // Call your custom onchange_callback function here
    myCustomOnChangeHandler(editor);
    
    // Call the provided onChange prop
    if (onChange) {
      onChange(content);
    }
  };

  useEffect(() => {
    // if (editorRef.current && value !== editorRef.current.getContent()) {
    //   editorRef.current.setContent(value);
    // }
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  return (
    <div className=' w-80c Large:w-60c'>
      <Editor
        // api key hidden due to security issues get your own from tinymce website
        apiKey={editorapi.apikey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
         
          branding: false,
          height: 400,
          menubar: true,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media Advanced Template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true
          
        }}
        onEditorChange={handleEditorChange}
        
      />
      <button onClick={log} className='mt-5gen bg-yellow-200 text-black-bg p-2'>
        Log editor content
      </button>
    </div>
  );
};

// Custom onchange_callback function
function myCustomOnChangeHandler(editor) {
  console.log("Someone modified something");
  console.log("The HTML is now: " + editor.getContent());
}

export default Texteditor;
