import React, { useState } from "react";
import {
  AtSign,
  CreditCard,
  UserCircle,
  Database,
  FileEditIcon,
  MoveRight,
} from "lucide-react";
import Footer from "../Footer";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Nav from "../Nav";

const FreelanceLanding = () => {
  useEffect(() => {
    (async function (e) {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <main
      className={`min-h-screen  flex flex-col`}
    >
      <Nav/>
      
      <section className="flex items-center flex-col px-0 py-11 mt-[20vh] justify-center w-full">
        <h2 className="text-[40px] lg:text-[48px]  w-80c lg:w-40c font-extrabold">
          A little bit about what i{" "}
          <span className="text-[#F2DD1F]">Offer</span>
        </h2>
        <p className=" w-80c lg:w-40c mt-5 text-2xl">
          I specialize in building{" "}
          <span className="font-extrabold">
            scalable, efficient, and high-performing
          </span>{" "}
          APIs tailored to
          <span className="font-extrabold"> your unique requirements</span>.
          Using Express, Node.js, or Django, APIs that seamlessly integrate with
          your applications{" "}
          <span className="font-extrabold">
            both web and native E-commerce and ERP applications.
          </span>
        </p>
        <p className="text-sm w-80c lg:w-40c mt-5 md:text-2xl">
          for larger projects i work with a team to provide seamless application
          development solutions just as per your need!
        </p>
      </section>
      <section className="flex items-center flex-col px-0 py-11 mt-10up justify-center w-full">
        <h2 className="text-[36px] lg:text-[42px] font-bold w-80c lg:w-40c">
          Let me handle the tech stack and service integrations so{" "}
          <span className="text-[#F2DD1F]">you</span> can{" "}
          <span className="text-[#F2DD1F]"> focus on your core business.</span>
        </h2>
        <p className="text-[#33363F] text-xl  w-80c lg:w-40c py-5  ">
          Login users, process payments and send emails at lightspeed. Spend
          your time building your startup, not integrating APIs. I provide you
          with everything you need !
        </p>
        <div className="flex flex-row gap-[4vw] mt-10up flex-wrap">
          <div className="flex flex-col gap-4 items-center">
            <AtSign />
            <p className="text-gray-500">Mail</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <CreditCard />
            <p className="text-gray-500">Payments</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <UserCircle />
            <p className="text-gray-500">Users</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Database />
            <p className="text-gray-500">DataBase</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FileEditIcon />
            <p className="text-gray-500">Design</p>
          </div>
        </div>
      </section>

      

      <section className="flex justify-center w-80c lg:w-90c flex-col items-center gap-9">
        <div className="flex flex-col gap-[2vh] border-dashed border-[2px] w-[300px] flex-wrap md:w-[600px] rounded-xl ml-12 md:ml-0">
          <div className="flex justify-between pr-2 items-center flex-col md:flex-row">
            <div className="flex flex-col pl-5 pt-4 ">
              <h3 className="font-bold text-3xl text-[#F2DD1F]">
                Solo developer plan
              </h3>
              <p className="font-extralight">for small and medium projects</p>
            </div>

            <span className="underline">12$/hour or 1000$/month(50%+ off)</span>
          </div>
          <div className="px-8 pb-4">
            <ul className="list-disc ">
              <li>Free project consultation</li>
              <li>Customized solutions as per your needs</li>
              <li>Upto 3 free revisions, then 15$ per revision</li>
              <li>choose between hourly and retainer based plans</li>
            </ul>

            <button
              className="bg-[#28A745] w-[117px] py-2  mt-4"
              data-cal-namespace="30min"
              data-cal-link="anshumancdx/30min"
              data-cal-config='{"layout":"month_view"}'
            >
              Hire now
            </button>
          </div>
        </div>

        {/*  */}

        <div className="flex flex-col gap-[2vh] border-dashed border-[2px] w-[300px] flex-wrap md:w-[600px] rounded-xl ml-12 md:ml-0">
          <div className="flex justify-between pr-2 items-center flex-col md:flex-row">
            <div className="flex flex-col pl-5 pt-4 ">
              <h3 className="font-bold text-3xl text-[#F2DD1F]">
                Team Development Plan
              </h3>
              <p className="font-extralight">For medium and large projects</p>
            </div>

            <span className="underline ">1413$/month(40% off) or custom</span>
          </div>
          <div className="px-8 pb-4">
            <ul className="list-disc ">
              <li>Free project consultation</li>
              <li>Customized solutions as per your needs</li>
              <li>Upto 7 free revisions, then 30$ per revision</li>
              <li>choose between retainer and project based plans</li>
            </ul>

            <button
              className="bg-[#28A745] w-[117px] py-2  mt-4"
              data-cal-namespace="30min"
              data-cal-link="anshumancdx/30min"
              data-cal-config='{"layout":"month_view"}'
            >
              Hire now
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-100c ml-14 md:ml-0 md:w-[35%] ">
          <p>Not sure about which plan to choose ?</p>
          <div className="md:flex-row flex gap-4 flex-col">
            <a href="">
              <button className="bg-inherit border-2 border-white px-4 py-2">
                write a mail-
              </button>
            </a>
           
              <button
                className="bg-[#F2DD1F] px-4 py-2 text-black"
                data-cal-namespace="15min"
                data-cal-link="anshumancdx/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {" "}
                Book a free call
              </button>
           
          </div>
          <p className="md:text-xl text-gray-500 mt-3 w-full">
            *Both plans comes with free consultation call
          </p>
        </div>
      </section>

      <section className="flex justify-center w-80c lg:w-90c  items-center mt-20 py-10">
        <div className="flex flex-col gap-2 ml-8 md:ml-0 md:w-[35%]">
          <h2 className="md:text-4xl font-extrabold">
            Turn your Business <span className="text-[#F2DD1F]">Idea</span> ,
            Into <span className="text-[#F2DD1F]">reality</span>
          </h2>
          <p className="mt-2 font-extralight">
            Don't waste time figuring out tech , subscriptions and Api
            integrations
          </p>
          <a href="" className="mt-8">
            <button className="bg-[#F2DD1F] px-4 py-2 text-black flex gap-1">
              {" "}
              Book a free call <MoveRight />
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FreelanceLanding;
