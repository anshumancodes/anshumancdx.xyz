import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='mt-10up'>
      
      <footer class="relative mt-20 border-t px-4 pt-20">
  <div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-[50%] border-2 border-sky-500 bg-white p-2"><img class="h-full object-contain" src="./public/imgs/anshumancdx.jpeg" alt="" /></div>
  <nav aria-label="Footer Navigation" class="mx-auto mb-10 flex items-center justify-center max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
    <a href="https://github.com/anshumancodes" target='_blank' class="text-1x++"><FaGithub /></a>
    <a href="mailto:anshumanprof01@gmail.com"  target='_blank'class="text-1x++"><IoMailOutline /></a>
    <a href="https://twitter.com/anshumancdx"  target='_blank'class="text-1x++"><FaXTwitter /></a>
    <a href="/admin" class="font-medium text-blue-500">Login as admin</a>
  </nav>
  <p class="py-10 text-center text-gray-300">anshumancdx ©  {new Date().getFullYear()} | All Rights Reserved</p>
</footer>

    </div>
  )
}
// flex w-screen items-center justify-center gap-3 flex-col
export default Footer
