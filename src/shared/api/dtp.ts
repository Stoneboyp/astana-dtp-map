import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { GeoJsonFeatureCollection } from "../types/geo";
import { API_URLS } from "@shared/config";

export const useDtpPointsQuery = () => {
  return useQuery({
    queryKey: ["dtp-points"],
    queryFn: async (): Promise<GeoJsonFeatureCollection> => {
      const { data } = await axios.get(API_URLS.DTP, {
        params: {
          where: "area_code='1971'",
          outFields: "*",
          returnGeometry: true,
          f: "geojson",
          outSR: 4326,
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
