import React, { useState, useEffect, useRef } from "react";
import { StaticMap, MapContext, NavigationControl } from "react-map-gl";
// eslint-disable-next-line import/no-extraneous-dependencies
import DeckGL from "@deck.gl/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { GeoJsonLayer } from "@deck.gl/layers";
import { toast } from "react-toastify";
import { getEarthquakesByDate } from "../../api/earthquake-api";
import FloatingFilterPanel from "../FloatingFilterPanel";
import FloatingDataPanel from "../FloatingDataPanel/FloatingDataPanel";

const INITIAL_VIEW_STATE = {
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

export default function MapContainer() {
  const [earthquakeData, setEarthquakeData] = useState({
    loaded: false,
    data: [],
  });
  const initialDates = {
    startDate: "2017-10-01",
    endDate: "2017-10-16",
  };
  const [dates, setDates] = useState(initialDates);
  const [loaded, setLoaded] = useState(false);
  const dateRef = useRef(dates);
  dateRef.current = dates;
  const [earthquakeDetails, setEarthquakeDetails] = useState();

  const fetchEarthquakeDataByDate = async (startDate, endDate) => {
    try {
      setLoaded(false);
      const { data } = await getEarthquakesByDate(startDate, endDate);
      setEarthquakeData({ loaded: true, data });
      setLoaded(true);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const onClick = (event) => {
    if (event.object) {
      setEarthquakeDetails(event.object);
    }
  };

  useEffect(() => {
    fetchEarthquakeDataByDate(
      dateRef.current.startDate,
      dateRef.current.endDate,
    );
  }, [dates]);

  useEffect(() => {
    fetchEarthquakeDataByDate(dates.startDate, dates.endDate);
  }, []);
  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        ContextProvider={MapContext.Provider}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {earthquakeData.loaded && (
          <GeoJsonLayer
            id="earthquakes"
            data={earthquakeData.data}
            // Styles
            filled
            pointRadiusMinPixels={2}
            pointRadiusMaxPixels={14}
            pointRadiusScale={4000}
            getPointRadius={(f) => f.properties.mag}
            getFillColor={(f) => [
              255,
              255 - (f.properties.mag * 255) / 10,
              51,
              180,
            ]}
            // Interactive props
            pickable
            autoHighlight
            onClick={onClick}
          />
        )}
        <StaticMap mapStyle={MAP_STYLE} />
        <NavigationControl style={NAV_CONTROL_STYLE} />
      </DeckGL>
      <FloatingFilterPanel
        handleDateChange={setDates}
        datesState={dates}
        loaded={loaded}
      />
      <FloatingDataPanel
        earthquakeDetails={earthquakeDetails}
        setEarthquakeDetails={setEarthquakeDetails}
      />
    </>
  );
}
