import React, { useState } from "react";
import Nav from "./components/Nav";




function App() {
  const [isDarkMode, setDarkMode] = useState(true);



  const toggleMode = () => {
    setDarkMode(isDarkMode=>!isDarkMode);
    
    
    
    

  };




  return ( 
    <div className={`h-screen ${isDarkMode ? "dark" : "light"}` }>
      <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
    </div>
  );
}

export default App;

