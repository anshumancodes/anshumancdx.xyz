import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import '/src/index.css';

const Nav = ({ isDarkMode, toggleMode }) => {
  
  const textMode={
    color:isDarkMode? 'text-white-color':'purple-smoke-color',
   
  }
  
  return (
    <header className="w-full flex justify-center">
    <nav className="flex flex-wrap justify-between items-center w-80c py-5">
      <span className={`text-${textMode.color} flex gap-8 cursor-crosshair font-semibold text-lg items-center`} >
        <a href="">Works</a>
        <a href="" className="flex gap-1 items-center">Source <DiGithubBadge className="text-3xl"/></a>
        <a href="">blogs</a>
      </span>

      <span className=""><button className={` ${isDarkMode ? "darkbtnbg" : "lightbtnbg"} p-3 text-${textMode.color} rounded-lg`} onClick={toggleMode}>{isDarkMode ? <MdLightMode  /> : <MdDarkMode />}</button></span>
    </nav>
    </header>
  );
};

export default Nav;
