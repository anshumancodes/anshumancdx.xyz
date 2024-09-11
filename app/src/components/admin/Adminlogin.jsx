import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { useNavigate } from 'react-router-dom';

const Adminlogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      //
     

      // Call the onLogin callback or perform other actions as needed
      onLogin(true);
      
      navigate("/admin/createblog")
      
    } catch (error) {
      // Handle login errors
      console.error("Error logging in:", error.message);
      // Display an error message or handle it as needed
    }
  };

  return (
    <div className="bg-black-bg h-screen items-center flex flex-col justify-center">
        {/*  */}

<h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-1x++ lg:text-2xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">login</span> to acess admin panel.</h1>

  {/*  */}
      <form onSubmit={handleLogin} className="flex flex-col w-300pwx gap-4">
        <label className="text-white-color">
          Email:
        
        </label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <label className="text-white-color">
          Password:
          
        </label>
        <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Adminlogin;
