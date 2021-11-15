import React from "react";
import { Link } from "react-router-dom";
import { APP } from "../../constants/routes";

export default function Header() {
  return (
    <div className="flex flex-wrap place-items-center">
      <div className="relative mx-auto">
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-3 lg:py-6 flex w-full items-center">
            <Link to={APP.HOME}>
              <p className="text-3xl font-bold font-heading font-mono select-none">
                QuakeLocator
              </p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
