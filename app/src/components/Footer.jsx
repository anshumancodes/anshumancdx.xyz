import React,{useContext} from "react";
import { Star, GithubIcon, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  
  return (
    <footer className="flex flex-col md:flex-row gap-y-6 md:gap-x-32 border-t border-t-[#33363f] w-full md:justify-center px-12 md:px-0 py-14">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl">anshumancdx</h2>
          <p className="text-base font-[100] ">
            Copyright © 2024-All rights reserved
          </p>
        </div>
        <div className="px-6 py-2 border border-[#33363F] flex gap-1 rounded mt-2">
          <p className="text-base font-[100] flex gap-1 ">
            Built by anshumancdx <Star />
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base font-[100] text-[#33363F]">Socials</p>

        <div className="flex flex-row ">
          <a href="" className="px-2 py-2 ">
            <GithubIcon />
          </a>
          <a href="" className="px-2 py-2 ">
            <Twitter />
          </a>
          <a href="" className="px-2 py-2 ">
            <Linkedin />
          </a>
        </div>

        <p className="text-base font-[100] text-[#33363F]">admin</p>
        <div>
          <a href="/admin" className="text-blue-500 ">
            login as admin
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-base font-[100] text-[#33363F]">Blog</p>
        {/* child of /blog */}

        <a href="https://anshumancdx.xyz/blog/understanding-express-middleware" className="text-sm mt-2 font-[100] underline">Express middlewares</a>
        <a href="https://anshumancdx.xyz/blog/Introduction-to-http-requests" className="text-sm mt-2 font-[100] underline">Introduction to http</a>
        <a href="https://anshumancdx.xyz/blog/Stateful_and_stateless_authentication" className="text-sm mt-2 font-[100] underline">Stateful vs stateless Auth </a>
     
      </div>
      <div className="flex flex-col">
      <p className="text-base font-[100] text-[#33363F]">legal</p>
      {/*child of /legal*/}
      <a href="/privacy-policy" className="text-sm    mt-2 font-[100] underline">Privacy policy</a>
      <a href="/terms-of-service" className="text-sm    mt-2 font-[100] underline">Terms of services</a>
      <a href="/contract-agreement" className="text-sm    mt-2 font-[100] underline">contract agreement</a> {/*child of /legal/docs */}

      </div>
    </footer>
  );
};
// flex w-screen items-center justify-center gap-3 flex-col
export default Footer;
