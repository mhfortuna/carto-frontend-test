import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { APP } from "../../constants/routes";
import EarthquakeDetails from "../../pages/EarthquakeDetails";

import Home from "../../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes key={window.location.pathname}>
          <Route path={APP.HOME} index exact element={<Home />} />
          <Route
            path={`${APP.EARTHQUAKE}/:id`}
            exact
            element={<EarthquakeDetails />}
          />
          {/* <PrivateRoute path="*">
          <NoMatch/>
        </PrivateRoute> */}
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
