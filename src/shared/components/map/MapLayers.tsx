// src/shared/components/map/MapLayers.tsx
import { Source, Layer } from "@vis.gl/react-maplibre";
import { useCityAreaQuery } from "@shared/api/cityArea";
import { useDtpPointsQuery } from "@shared/api/dtp";

import type { GeoJsonFeatureCollection } from "@shared/types/geo";

export const MapLayers = () => {
  const { data: cityData, isLoading: cityLoading } = useCityAreaQuery();
  const { data: dtpData } = useDtpPointsQuery();

  if (cityLoading || !cityData) return null;

  const cityGeoJson: GeoJsonFeatureCollection = cityData;

  return (
    <>
      {/* Граница города */}
      <Source id="city-area" type="geojson" data={cityGeoJson}>
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

      {/* Точки ДТП с кластеризацией */}
      {dtpData && (
        <Source
          id="dtp-points"
          type="geojson"
          data={dtpData as GeoJsonFeatureCollection} // приводим к типу
          cluster={true}
          clusterRadius={50}
          clusterMaxZoom={14}
        >
          {/* Кластеры */}
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#f87171",
              "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 50, 30],
            }}
          />
          {/* Количество в кластере */}
          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              "text-size": 12,
            }}
          />
          {/* Отдельные точки */}
          <Layer
            id="unclustered-point"
            type="circle"
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": "#fbbf24",
              "circle-radius": 6,
            }}
          />
        </Source>
      )}
    </>
  );
};
