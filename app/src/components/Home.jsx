
import React, { useState } from "react";

import Nav from "./Nav";
import Me from "./Me";
import Introduction from "./Introduction";
import Path from "./Path";
import PopularBlogs from "./PopularBlogs";
import Footer from "./Footer";


const Home = ({ isDarkMode, toggleMode }) => {
  // const [isDarkMode, setDarkMode] = useState(true);

  // const toggleMode = () => {
  //   setDarkMode((isDarkMode) => !isDarkMode);
  // };
  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : "light"} flex flex-col` }>
        <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <Me isDarkMode={isDarkMode} />
      <Introduction isDarkMode={isDarkMode} />
      <Path/>
      {/* disabled as there is no blogs currently */}
      {/* <PopularBlogs/> */}
      <Footer/>
    </div>
  );
};

export default Home;
