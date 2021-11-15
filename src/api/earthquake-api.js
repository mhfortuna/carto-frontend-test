import { API } from "../constants/routes";

const axios = require("axios").default;

export function makeEarthquakeApi() {
  return axios.create({
    baseURL: API.EARTHQUAKE.MAIN,
  });
}

export async function getEarthquakesByDate(
  startDate = "2017-10-01",
  endDate = "2017-10-16",
  eventType = "earthquake",
  limit = 20000,
  // orderby = "magnitude",
  api = makeEarthquakeApi(),
) {
  return api.get(
    `/query?format=geojson&starttime=${startDate}&endtime=${endDate}&eventtype${eventType}&limit=${limit}`,
  );
}

export async function getEarthquakeById(
  id = "ak10992887",
  api = makeEarthquakeApi(),
) {
  return api.get(`/query?format=geojson&eventid=${id}`);
}
