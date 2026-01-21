import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { GeoJsonFeatureCollection } from "../types/geo";

const DTP_URL =
  "https://gis.kgp.kz/arcgis/rest/services/KPSSU/DTP/FeatureServer/0/query";

export const useDtpPointsQuery = () => {
  return useQuery({
    queryKey: ["dtp-points"],
    queryFn: async (): Promise<GeoJsonFeatureCollection> => {
      const { data } = await axios.get(DTP_URL, {
        params: {
          where: "area_code='1971'",
          outFields: "*",
          returnGeometry: true,
          f: "geojson",
        },
      });
      return data;
    },
  });
};
