import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { StaticMap, MapContext, NavigationControl } from "react-map-gl";
import { DeckGL, GeoJsonLayer } from "deck.gl";

import { getEarthquakesByDate } from "../../api/earthquake-api";
import FloatingFilterPanel from "../FloatingFilterPanel";
import FloatingDataPanel from "../FloatingDataPanel";

import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";

export default function MapContainer() {
  // Dates range
  const localStorageDatesKey = "EARTHQUAKES_DATES";
  const initialDates = localStorage.getItem(localStorageDatesKey)
    ? JSON.parse(localStorage.getItem(localStorageDatesKey))
    : {
        startDate: "2017-10-15",
        endDate: "2017-10-16",
      };
  const [dates, setDates] = useState(initialDates);

  // API data
  const [earthquakeData, setEarthquakeData] = useState({
    loaded: false,
    data: [],
  });

  const fetchEarthquakeDataByDate = async (startDate, endDate) => {
    try {
      setEarthquakeData({ ...earthquakeData, loaded: false });
      const { data } = await getEarthquakesByDate(startDate, endDate);
      setEarthquakeData({ loaded: true, data });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast("Too many earthquakes between these dates, reduce dates range", {
          type: "error",
        });
      } else {
        toast(error.message, { type: "error" });
      }
      setEarthquakeData({ ...earthquakeData, loaded: true });
    }
  };

  useEffect(() => {
    fetchEarthquakeDataByDate(dates.startDate, dates.endDate);
    localStorage.setItem(localStorageDatesKey, JSON.stringify(dates));
  }, [dates]);

  // Map viewport
  let isHovering = false;
  const localStorageViewKey = "EARTHQUAKES_VIEW";
  const initialViewState = localStorage.getItem(localStorageViewKey)
    ? JSON.parse(localStorage.getItem(localStorageViewKey))
    : {
        latitude: 33.6713333,
        longitude: -116.7165,
        zoom: 4,
        bearing: 0,
        pitch: 30,
      };
  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
  const NAV_CONTROL_STYLE = {
    position: "absolute",
    top: 10,
    left: 10,
  };

  const handleViewStateChange = (viewState) => {
    localStorage.setItem(
      localStorageViewKey,
      JSON.stringify(viewState.viewState),
    );
  };

  // Earthquake details panel
  const [earthquakeDetails, setEarthquakeDetails] = useState();

  const handleClick = (event) => {
    if (event.object) {
      setEarthquakeDetails(event.object);
    }
  };

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        onViewStateChange={handleViewStateChange}
        controller
        ContextProvider={MapContext.Provider}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 10,
        }}
        onHover={({ object }) => {
          isHovering = Boolean(object);
        }}
        getCursor={({ isDragging }) => {
          if (isDragging) {
            return "grabbing";
          }
          if (isHovering) {
            return "pointer";
          }
          return "grab";
        }}
      >
        {earthquakeData.data && (
          <GeoJsonLayer
            id="earthquakes"
            data={earthquakeData.data}
            // Styles
            filled
            pointRadiusMinPixels={5}
            pointRadiusMaxPixels={20}
            pointRadiusScale={7000}
            getPointRadius={(f) => f.properties.mag}
            getFillColor={(f) =>
              f.properties.status === "reviewed"
                ? [255, 255 - (f.properties.mag * 255) / 10, 51, 180]
                : [51, 255 - (f.properties.mag * 255) / 10, 255, 180]
            }
            // Interactive props
            pickable
            autoHighlight
            onClick={handleClick}
          />
        )}
        <StaticMap mapStyle={MAP_STYLE} />
        <NavigationControl style={NAV_CONTROL_STYLE} />
      </DeckGL>
      <FloatingFilterPanel
        handleDateChange={setDates}
        datesState={dates}
        loaded={earthquakeData.loaded}
      />
      <FloatingDataPanel
        earthquakeDetails={earthquakeDetails}
        setEarthquakeDetails={setEarthquakeDetails}
      />
    </>
  );
}
