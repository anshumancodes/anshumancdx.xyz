import React from 'react'
import { GiSpiderWeb } from "react-icons/gi";

const Me = ({isDarkMode}) => {
  return (
    <div className='mt-10up flex flex-col items-center gap-4'>
      <span className='text-purple-smoke font-bold text-3x'>Hello 👋</span>
      <span className={`${isDarkMode ? "darkbtnbg" : "lightbtnbg"} py-5 flex gap-1 items-center px-8 rounded-medium-card text-1x+`}><GiSpiderWeb />Full-stack developer based in 🇮🇳</span>
    </div>
  )
}

export default Me
