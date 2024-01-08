import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localstorage";
const Header = () => {
  let nav = useNavigate();
  let userExists = getDataFromLocalStorage();
  return (
    <div className="h-20">
      <nav className="bg-[#583101] fixed w-full h-[100px] z-20 top-0 left-0 border-b ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
          <a href="/" className="flex items-center">
            <img
              src="data:image/png;base64,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"
              className="mr-3 h-10"
              alt="Flowbite Logo"
            />
            <h5 className="text-white">BLOGZZ</h5>
          </a>

          <div className="flex md:order-2">
            {!userExists && (
              <button
                type="button"
                onClick={() => nav("/register")}
                className="text-[#583101] bg-[#FFF6EB] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0  dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Register
              </button>
            )}
            {userExists && (
              <button
                type="button"
                onClick={() => nav("/create-post")}
                className="text-[white] ml-2 bg-[purple] hover:bg-[purple] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0  dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create Post
              </button>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0   dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page">
                  Home
                </a>
              </li>
              {userExists && (
                <li>
                  <a
                    href="/userposts"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    My Posts
                  </a>
                </li>
              )}

              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
