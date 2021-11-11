import React, { useState, useEffect, useRef } from "react";
import { StaticMap, MapContext, NavigationControl } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { toast } from "react-toastify";
import { getEarthquakesByDate } from "../../api/earthquake-api";

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

export default function MapContainer({ dates }) {
  const [earthquakeData, setEarthquakeData] = useState({
    loaded: false,
    data: [],
  });
  const [loaded, setLoaded] = useState(true);
  const dateRef = useRef(dates);
  dateRef.current = dates;

  const fetchEarthquakeDataByDate = async (startDate, endDate) => {
    try {
      const { data } = await getEarthquakesByDate(startDate, endDate);
      setEarthquakeData({ loaded: true, data });
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const onClick = (event) => {
    if (event.object) {
      toast(event.object.properties.title, { type: "success" });
      console.log(event.object.properties);
    }
  };

  const layers = new GeoJsonLayer({
    id: "earthquakes",
    data: earthquakeData.data,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 8000,
    getPointRadius: (f) => f.properties.mag,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick,
  });
  useEffect(() => {
    const debounceTime = 1000;
    if (loaded) {
      setLoaded(false);
      setTimeout(() => {
        fetchEarthquakeDataByDate(
          dateRef.current.startDate,
          dateRef.current.endDate,
        );
        setLoaded(true);
      }, debounceTime);
    }
  }, [dates]);

  useEffect(() => {
    fetchEarthquakeDataByDate(dates.startDate, dates.endDate);
  }, []);
  return (
    // <div className="h-auto">
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={earthquakeData.loaded && layers}
      ContextProvider={MapContext.Provider}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <StaticMap mapStyle={MAP_STYLE} />
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
    // </div>
  );
}
