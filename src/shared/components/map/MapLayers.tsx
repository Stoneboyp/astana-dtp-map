import { Source, Layer } from "@vis.gl/react-maplibre";
import { observer } from "mobx-react-lite";
import { useCityAreaQuery } from "@shared/api/cityArea";
import { useDtpPointsQuery } from "@shared/api/dtp";
import { mapUiStore } from "@shared/store/mapUiStore";
import type { GeoJsonFeatureCollection } from "@shared/types/geo";

export const MapLayers = observer(() => {
  const { data: cityData } = useCityAreaQuery();
  const { data: dtpData } = useDtpPointsQuery();
  const { selectedPoint, layersVisible } = mapUiStore;
  return (
    <>
      {cityData && layersVisible.cityArea && (
        <Source
          id="city-area"
          type="geojson"
          data={cityData as GeoJsonFeatureCollection}
        >
          <Layer
            id="city-area-fill"
            type="fill"
            paint={{ "fill-color": "#3b82f6", "fill-opacity": 0.1 }}
          />
          <Layer
            id="city-area-outline"
            type="line"
            paint={{ "line-color": "#2563eb", "line-width": 2 }}
          />
        </Source>
      )}

      {dtpData && layersVisible.dtpPoints && (
        <Source
          key={layersVisible.clusterMode ? "clustered" : "raw"}
          id="dtp-points"
          type="geojson"
          data={dtpData as GeoJsonFeatureCollection}
          cluster={layersVisible.clusterMode}
          clusterRadius={50}
          clusterMaxZoom={14}
        >
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            layout={{
              visibility: layersVisible.clusterMode ? "visible" : "none",
            }}
            paint={{
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                10,
                "#f1f075",
                50,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                10,
                25,
                50,
                35,
              ],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
            }}
          />

          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              visibility: layersVisible.clusterMode ? "visible" : "none",
              "text-field": "{point_count_abbreviated}",
              "text-size": 12,
            }}
          />

          <Layer
            id="unclustered-point"
            type="circle"
            filter={
              (layersVisible.clusterMode
                ? ["!", ["has", "point_count"]]
                : ["all"]) as any
            }
            paint={{
              "circle-color": "#fbbf24",
              "circle-radius": 7,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />

          {selectedPoint && (
            <Layer
              id="selected-point-highlight"
              type="circle"
              filter={["==", ["get", "objectid"], selectedPoint.id] as any}
              paint={{
                "circle-color": "transparent",
                "circle-radius": 8,
                "circle-stroke-width": 4,
                "circle-stroke-color": "#ffffff",
              }}
            />
          )}
        </Source>
      )}
    </>
  );
});
