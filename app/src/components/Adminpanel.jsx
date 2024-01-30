import React from "react";

const Adminpanel = () => {
  return (
    <div className=" sm:flex-col lg:flex lg:flex-row gap-[1vw] bg-black-bg ">
      <div className="bg-white-color p-5 rounded-[21px] lg:ml-[1vw] mt-5 text-black lg:w-[40%] sm:w-[90%]">
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Create Blog</h2>
        <div>

          <div className="">
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
          </div>

          <div className="mt-10">
            <label
              for="message"
              class="block mb-2 text-sm font-medium "
            >
              blog body/content
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

        </div>
      </div>
      {/* blog edditing panel down */}

     
      <div className="mt-5 p-5 bg-white-color text-black lg:w-[40%] rounded-[21px] sm:w-[90%]">
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Blog edditing panel</h2>
      </div>



       {/* ignore these for now  */}
      <div className="mt-5  text-black lg:w-[20%] sm:w-[90%] lg:mr-[1vw]">

        <div className=" bg-white-color rounded-[21px] p-5 h-[70vh]" >
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Work enquires</h2>
        </div>

        <div className="mt-10 bg-gray-color text-white-color rounded-[21px] p-3 h-200phx">
            <p>Total views:</p>
            <p>Total views:</p>
            <p>Total views:</p>

        </div>

      </div>
    </div>
  );
};

export default Adminpanel;
