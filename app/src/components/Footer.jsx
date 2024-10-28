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
          <a href="https://anshumancdx.xyz">
          <p className="text-base font-[100] flex gap-1 ">
            Built by anshumancdx <Star />
          </p>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base font-[100] text-[#33363F]">Socials</p>

        <div className="flex flex-row ">
          <a href="https://github.com/anshumancodes" className="px-2 py-2 " aria-label="github">
            <GithubIcon />
          </a>
          <a href="https://x.com/anshumancdx" className="px-2 py-2 " aria-label="twitter">
            <Twitter />
          </a>
          <a href="https://www.linkedin.com/in/anshumancdx/" className="px-2 py-2 " aria-label="linkedin">
            <Linkedin />
          </a>
        </div>

        <p className="text-base font-[100] text-[#33363F]">admin</p>
        <div>
          <a href="/admin/login" className="text-blue-500 ">
            login as admin
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-base font-[100]">Blog</p>
        {/* child of /blog */}

        <a href="https://anshumancdx.xyz/blog/understanding_nodejs_versioning" className="text-sm mt-2 font-[100] underline">understanding nodejs versioning</a>
        <a href="https://anshumancdx.xyz/blog/https://anshumancdx.xyz/blog/introduction_to_http_" className="text-sm mt-2 font-[100] underline">Introduction to http</a>
        <a href="https://anshumancdx.xyz/blog/node_js_auth_stateless_vs_stateful" className="text-sm mt-2 font-[100] underline">Stateful vs stateless Auth </a>
     
      </div>
      <div className="flex flex-col">
      <p className="text-base font-[100] ">legal</p>
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
