import React, { useState } from "react";
import MapContainer from "../../components/MapContainer";
import Layout from "../../components/Layout";
import FloatingPanel from "../../components/FloatingPanel";

export default function Home() {
  const initialDates = {
    startDate: "2017-10-01",
    endDate: "2017-10-16",
  };
  const [dates, setDates] = useState(initialDates);

  return (
    <Layout>
      {/* <div className="flex"> */}
      <MapContainer dates={dates} />
      {/* </div> */}
      <FloatingPanel handleDateChange={setDates} datesState={dates} />
    </Layout>
  );
}
