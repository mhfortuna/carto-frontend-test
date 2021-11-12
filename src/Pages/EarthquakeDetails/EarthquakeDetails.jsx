import React, { useState, useEffect } from "react";
import { useMatch, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchEarthquakeDataById(earthquakeId);
  }, [earthquakeId]);

  return (
    <Layout>
      <div className="flex flex-col justify-center h-full ">
        <div className="flex flex-col w-2/3 mx-auto mt-6 bg-pink-700 bg-opacity-80 text-gray-200 p-6 rounded-xl gap-y-4">
          <div className="flex flex-col">
            <p className="text-5xl text-center uppercase font-extrabold">
              Earthquake details
            </p>
            {/* <div className="flex justify-end m-0"> */}
            <p className="text-base text-gray-900 text-center font-medium">
              <span className="uppercase font-medium">ID: </span>
              {earthquakeId}
            </p>
            {/* </div> */}
          </div>
          {earthquakeData.loaded ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-lg break-normal capitalize">
                  <span className="font-extrabold uppercase">Type: </span>
                  {earthquakeData.data.properties.type}
                </p>
                <p className="text-lg break-normal">
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
                <p className="text-lg break-normal">
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
                <p className="text-lg break-normal capitalize">
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
            <Link
              className="px-6 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-75 p-2 text-white ml-auto "
              to={APP.HOME}
            >
              Go back
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
