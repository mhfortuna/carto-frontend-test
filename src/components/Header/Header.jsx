import React from "react";
import { Link } from "react-router-dom";
import { APP } from "../../constants/routes";

export default function Header() {
  return (
    // <div className="absolute z-10">
    <div className="flex flex-wrap place-items-center">
      <div className="relative mx-auto">
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-3 lg:py-6 flex w-full items-center">
            <Link to={APP.HOME}>
              <p className="text-3xl font-bold font-heading font-mono select-none">
                {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}
                QuakeLocator
              </p>
            </Link>
            {/* <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <p className="hover:text-gray-200">Home</p>
                </li>
                <li>
                  <p className="hover:text-gray-200">Home</p>
                </li>
                <li>
                  <p className="hover:text-gray-200">Home</p>
                </li>
              </ul> */}
          </div>
        </nav>
      </div>
    </div>
    // </div>
  );
}
