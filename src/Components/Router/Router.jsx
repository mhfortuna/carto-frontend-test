import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { APP } from "../../constants/routes";

import Home from "../../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP.HOME} exact>
          <Route index element={<Home />} />
        </Route>
        {/* <PrivateRoute path="*">
          <NotFound />
        </PrivateRoute> */}
      </Routes>
    </BrowserRouter>
  );
}
