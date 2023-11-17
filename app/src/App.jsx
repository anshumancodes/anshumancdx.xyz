import React from "react"
import Nav from "./components/Nav"
import { useState } from "react";
function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };
  
  const BackgroundMode={
    backgroundColor: isDarkMode ? 'whiteColorBg' : 'primary-black-bg'  ,
     
   }

  
   
  return (
    
    <div className={`h-screen bg-${BackgroundMode.backgroundColor}`}>
      <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      
    </div>
  )
}

export default App
