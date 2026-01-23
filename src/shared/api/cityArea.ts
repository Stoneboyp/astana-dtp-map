import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { GeoJsonFeatureCollection } from "@shared/types/geo";
import { API_URLS } from "@shared/config";

export const useCityAreaQuery = () => {
  return useQuery({
    queryKey: ["city-area"],
    queryFn: async (): Promise<GeoJsonFeatureCollection> => {
      const { data } = await axios.get(API_URLS.CITY_AREA, {
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
    staleTime: Infinity,
  });
};
