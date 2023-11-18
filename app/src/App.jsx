import React, { useState } from "react";
import Nav from "./components/Nav";
import Me from "./components/Me";
import Introduction from "./components/Introduction";




function App() {
  const [isDarkMode, setDarkMode] = useState(true);



  const toggleMode = () => {
    setDarkMode(isDarkMode=>!isDarkMode);
    
    
    
    

  };




  return ( 
    <div className={`h-screen ${isDarkMode ? "dark" : "light"} flex flex-col` }>
      <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <Me isDarkMode={isDarkMode} />
      <Introduction isDarkMode={isDarkMode} />
    </div>
   
  );
}

export default App;

