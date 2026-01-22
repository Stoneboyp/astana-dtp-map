import { Map } from "@vis.gl/react-maplibre";
import type { MapRef, MapMouseEvent } from "@vis.gl/react-maplibre";
import type { GeoJSONSource } from "maplibre-gl";
import { useRef } from "react";
import { observer } from "mobx-react-lite";

import { MAP_SETTINGS } from "@shared/config";
import { MapLayers } from "./MapLayers";
import { mapUiStore } from "@shared/store/mapUiStore";

export const MapView = observer(() => {
  const mapRef = useRef<MapRef | null>(null);

  const onClick = async (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature) {
      mapUiStore.clearSelectedPoint();
      return;
    }

    if (feature.properties?.cluster) {
      const clusterId = feature.properties.cluster_id;
      const source = mapRef.current?.getSource("dtp-points") as GeoJSONSource;

      if (source) {
        const zoom = await source.getClusterExpansionZoom(clusterId);
        mapRef.current?.easeTo({
          center: (feature.geometry as any).coordinates,
          zoom: zoom + 0.5,
          duration: 500,
        });
      }
      return;
    }

    if (feature.layer.id === "unclustered-point") {
      const coords = (feature.geometry as any).coordinates as [number, number];
      const id = feature.properties?.objectid || feature.properties?.id;

      if (id) {
        mapUiStore.setSelectedPoint({
          id,
          coordinates: coords,
        });

        mapRef.current?.easeTo({
          center: coords,
          duration: 300,
        });
      }
    }
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={MAP_SETTINGS.ASTANA_VIEW}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: "100vw", height: "100vh" }}
      interactiveLayerIds={["clusters", "unclustered-point"]}
      onClick={onClick}
      cursor="pointer"
    >
      <MapLayers />
    </Map>
  );
});
