import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Moon, Sun } from "lucide-react";

const Nav = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="flex items-center justify-around py-8 shadow-sm ">
      <div className="flex gap-4 font-semibold">
        <a href="/">Home</a>
        <a aria-label="blog page" href="/blog">Blog</a>
        <a aria-label="for business" href="/business">Hire Me</a>
        <a aria-label="github link" href="https://github.com/anshumancodes" className="underline">GitHub</a>
      </div>
      <div>
        <button onClick={toggleDarkMode} className="focus:outline-none  rounded-lg p-1" name="darkmode/lightmode" aria-label="darkmode/lightmode">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;