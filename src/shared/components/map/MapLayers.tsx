import { Source, Layer, Popup } from "@vis.gl/react-maplibre";
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
          id="dtp-points"
          type="geojson"
          data={dtpData as GeoJsonFeatureCollection}
          cluster={true}
          clusterRadius={50}
          clusterMaxZoom={14}
        >
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#f87171",
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                10,
                20,
                50,
                30,
              ],
            }}
          />
          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-size": 12,
            }}
          />

          <Layer
            id="unclustered-point"
            type="circle"
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": "#fbbf24",
              "circle-radius": 6,
            }}
          />

          {selectedPoint && (
            <Layer
              id="selected-point-highlight"
              type="circle"
              filter={["==", ["get", "objectid"], selectedPoint.id]}
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

      {selectedPoint && (
        <Popup
          longitude={selectedPoint.coordinates[0]}
          latitude={selectedPoint.coordinates[1]}
          anchor="bottom"
          offset={15}
          onClose={() => mapUiStore.clearSelectedPoint()}
          closeOnClick={false}
        >
          <div style={{ color: "#000", padding: "5px" }}>
            <strong>ДТП #{selectedPoint.id}</strong>
            <p style={{ fontSize: "11px", margin: "5px 0 0" }}>
              Координаты: {selectedPoint.coordinates[1].toFixed(4)},{" "}
              {selectedPoint.coordinates[0].toFixed(4)}
            </p>
          </div>
        </Popup>
      )}
    </>
  );
});
