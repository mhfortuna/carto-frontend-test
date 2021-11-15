import React from "react";
import { Link } from "react-router-dom";
// import {
//   BiCalendarExclamation,
//   BiCheckDouble,
//   BiCurrentLocation,
//   BiX,
// } from "react-icons/bi";
import { MdOutlineDangerous } from "react-icons/md";
import Layout from "../../components/Layout";
import { APP } from "../../constants/routes";

import backgroundMap from "../../assets/img/world.svg";

export default function NoMatch() {
  return (
    <Layout>
      <div className="flex flex-col justify-center h-full ">
        <div className="flex flex-col w-11/12 lg:w-2/3 xl:w-1/2 2xl:w-2/5 mx-auto mt-6 bg-pink-700 bg-opacity-80 text-gray-200 p-6 rounded-xl gap-y-4">
          <div className="flex flex-col">
            <p className="text-4xl xl:text-5xl text-center uppercase font-extrabold select-none">
              <MdOutlineDangerous className="inline-block mb-1" size="50px" />{" "}
              Page not found!{" "}
              <MdOutlineDangerous className="inline-block mb-1" size="50px" />
            </p>
            {/* </div> */}
            <p className="text-lg break-normal font-semibold my-6">
              If you are seeing this page, it means that the page you are
              looking for does not exist.
            </p>
          </div>

          <div className="flex justify-between">
            <Link
              className="px-6 flex items-center justify-center rounded-full uppercase font-extrabold text-xl bg-gray-900 bg-opacity-75 p-4 text-white select-none mx-auto"
              to={APP.HOME}
            >
              Home
            </Link>
          </div>
        </div>
        <img
          src={backgroundMap}
          alt="background map"
          className="w-full h-full absolute top-0 left-0 -z-10 object-cover bg-gray-200"
        />
      </div>
    </Layout>
  );
}
