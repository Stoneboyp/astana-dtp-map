import { Source, Layer } from "@vis.gl/react-maplibre";
import type { LayerProps } from "react-map-gl";

import { useCityAreaQuery } from "@shared/api/cityArea";
import type { GeoJsonFeatureCollection } from "@shared/types/geo";

export const MapLayers = () => {
  const { data, isLoading } = useCityAreaQuery();

  if (isLoading || !data) return null;

  const geoJson: GeoJsonFeatureCollection = data;

  return (
    <Source id="city-area" type="geojson" data={geoJson}>
      <Layer
        id="city-area-fill"
        type="fill"
        paint={{
          "fill-color": "#3b82f6",
          "fill-opacity": 0.1,
        }}
      />

      <Layer
        id="city-area-outline"
        type="line"
        paint={{
          "line-color": "#2563eb",
          "line-width": 2,
        }}
      />
    </Source>
  );
};
