import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { APP } from "../../constants/routes";
import EarthquakeDetails from "../../pages/EarthquakeDetails";

import Home from "../../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP.HOME} exact>
          <Route index element={<Home />} />
        </Route>
        <Route path={`${APP.EARTHQUAKE}/:id`} exact>
          <Route index element={<EarthquakeDetails />} />
        </Route>
        {/* <PrivateRoute path="*">
          <NoMatch/>
        </PrivateRoute> */}
      </Routes>
    </BrowserRouter>
  );
}
