import React, { useState, useEffect } from "react";
import { useMatch, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  BiCalendarExclamation,
  BiCheckDouble,
  BiCurrentLocation,
  BiX,
} from "react-icons/bi";

import { getEarthquakeById } from "../../api/earthquake-api";
import Layout from "../../components/Layout";
import { APP } from "../../constants/routes";
import { milisecondsToDate } from "../../utils/date-functions";
import backgroundMap from "../../assets/img/world.svg";

export default function EarthquakeDetails() {
  const navigate = useNavigate();
  const { earthquakeId } = useMatch(`${APP.EARTHQUAKE}/:earthquakeId`).params;
  const [earthquakeData, setEarthquakeData] = useState({
    data: [],
    loaded: false,
  });

  const fetchEarthquakeDataById = async (id) => {
    try {
      const { data } = await getEarthquakeById(id);
      setEarthquakeData({ data, loaded: true });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Earthquake ID not found", {
          type: "error",
        });
      } else {
        toast(error.message, { type: "error" });
      }
      navigate(APP.HOME);
    }
  };

  useEffect(() => {
    fetchEarthquakeDataById(earthquakeId);
  }, [earthquakeId]);

  return (
    <Layout>
      <div className="flex flex-col justify-center h-full ">
        <div className="flex flex-col w-11/12 lg:w-2/3 xl:w-1/2 2xl:w-2/5 mx-auto mt-6 bg-pink-700 bg-opacity-80 text-gray-200 p-6 rounded-xl gap-y-4">
          <div className="flex flex-col">
            <p className="text-4xl xl:text-5xl text-center uppercase font-extrabold select-none">
              Earthquake details
            </p>
            <p className="text-base text-gray-900 text-center font-medium">
              <span className="uppercase font-medium">ID: </span>
              {earthquakeId}
            </p>
          </div>
          {earthquakeData.loaded ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <p className="text-lg break-normal capitalize">
                  <span className="font-extrabold uppercase">Type: </span>
                  {earthquakeData.data.properties.type}
                </p>
                <p className="text-lg break-normal order-4 md:order-none">
                  <span className="font-extrabold uppercase">
                    <BiCurrentLocation
                      className="inline-block mb-1 mr-2"
                      size="20px"
                    />
                    Location:{" "}
                  </span>
                  {earthquakeData.data.properties.place}
                </p>
                <p className="text-lg break-normal">
                  <span className="font-extrabold uppercase">Magnitude: </span>
                  {earthquakeData.data.properties.mag}
                  <span className="font-thin text-gray-300">{` [${earthquakeData.data.properties.magType}]`}</span>
                </p>
                <p className="text-lg break-normal order-5 md:order-none">
                  <span className="font-extrabold uppercase">
                    <BiCalendarExclamation
                      className="inline-block mb-1 mr-2"
                      size="20px"
                    />
                    Date:{" "}
                  </span>
                  {milisecondsToDate(earthquakeData.data.properties.time)}
                </p>
                <p className="text-lg break-normal">
                  <span className="font-extrabold uppercase">Title: </span>
                  {earthquakeData.data.properties.title}
                </p>
                <p className="text-lg break-normal capitalize order-6 md:order-none">
                  <span className="font-extrabold uppercase">
                    {earthquakeData.data.properties.status === "reviewed" ? (
                      <BiCheckDouble
                        className="inline-block mb-1 mr-2"
                        size="20px"
                      />
                    ) : (
                      <BiX className="inline-block mb-1 mr-2" size="20px" />
                    )}
                    Status:{" "}
                  </span>
                  {earthquakeData.data.properties.status}
                </p>
              </div>
            </>
          ) : (
            <div
              className="
          animate-spin
          rounded-full
          h-10
          w-10
          border-b-2 border-gray-100
          "
            />
          )}
          <div className="flex justify-between">
            {earthquakeData.loaded && (
              <p className="font-light break-normal mt-2">
                <span className="">Last update: </span>
                {milisecondsToDate(earthquakeData.data.properties.updated)}
              </p>
            )}
            <Link to={APP.HOME}>
              <motion.button
                type="button"
                className="px-6 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-75 p-2 text-white select-none ml-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go back
              </motion.button>
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
