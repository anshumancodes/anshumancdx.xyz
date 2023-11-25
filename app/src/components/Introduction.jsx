import React from "react";

const Introduction = ({isDarkMode}) => {
  return (
    <div className="justify-center   flex w-full mt-5gen">
      <div className="w-40c max-[594px]:w-70c ]  flex-col flex gap-4  text-left">

        <span className={`flex ${isDarkMode ? "darktxt" : "lighttxt"}`} >
          <span className="text-purple-color-normal">Anshuman🍕</span>
          -Introduction
        </span>

        <p className="text-white-smoke-color">
          Hello, this is Anshuman and I love computer science , I have been writing code and creating small web apps since a year now.
          am familiar with few programming languages like JavaScript , python and C & right now am a fulltime comp sci student.
        </p>

        <span>
            <ul>
                <li>-Web developer</li>
                <li>-Designer </li>
            </ul>
        </span>
        <div className="w-full flex justify-center"><img src="./imgs/pizza.png" alt="" className="w-200pwx rounded-complete"/></div>
      </div>
    </div>
  );
};

export default Introduction;
