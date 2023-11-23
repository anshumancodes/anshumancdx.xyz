
import React, { useState } from "react";

import Nav from "./Nav";
import Me from "./Me";
import Introduction from "./Introduction";
import Path from "./Path";
import PopularBlogs from "./PopularBlogs";


const Home = ({ isDarkMode, toggleMode }) => {
  // const [isDarkMode, setDarkMode] = useState(true);

  // const toggleMode = () => {
  //   setDarkMode((isDarkMode) => !isDarkMode);
  // };
  return (
    <div className={`h-fit ${isDarkMode ? "dark" : "light"} flex flex-col` }>
        <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <Me isDarkMode={isDarkMode} />
      <Introduction isDarkMode={isDarkMode} />
      <Path/>
      <PopularBlogs/>
    </div>
  );
};

export default Home;
