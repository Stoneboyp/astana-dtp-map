import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { GeoJsonFeatureCollection } from "../types/geo";

const CITY_AREA_URL =
  "https://services8.arcgis.com/GyR85gR88mMqIY4t/ArcGIS/rest/services/Open_dataset_of_administrative_boundaries_of_Kazakhstan_WFL1/FeatureServer/1/query";

export const useCityAreaQuery = () => {
  return useQuery({
    queryKey: ["city-area"],
    queryFn: async (): Promise<GeoJsonFeatureCollection> => {
      const { data } = await axios.get(CITY_AREA_URL, {
        params: {
          where: "name_en='Astana'",
          outFields: "*",
          returnGeometry: true,
          f: "pgeojson",
          outSR: 4326,
        },
      });
      return data;
    },
  });
};
