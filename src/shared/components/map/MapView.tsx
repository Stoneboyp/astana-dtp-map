import { Map } from "@vis.gl/react-maplibre";
import type { MapRef, MapMouseEvent } from "@vis.gl/react-maplibre";
import type { GeoJSONSource } from "maplibre-gl";
import { useRef } from "react";

import { MAP_SETTINGS } from "@shared/config";
import { MapLayers } from "./MapLayers";

export const MapView = () => {
  const mapRef = useRef<MapRef | null>(null);

  const onClick = async (event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature) return;

    if (!feature.properties?.cluster) return;

    const clusterId = feature.properties.cluster_id;
    const source = mapRef.current?.getSource("dtp-points") as GeoJSONSource;

    if (!source) return;

    const zoom = await source.getClusterExpansionZoom(clusterId);

    mapRef.current?.easeTo({
      center: feature.geometry.coordinates as [number, number],
      zoom,
      duration: 500,
    });
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={MAP_SETTINGS.ASTANA_VIEW}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: "100vw", height: "100vh" }}
      interactiveLayerIds={["clusters"]}
      onClick={onClick}
    >
      <MapLayers />
    </Map>
  );
};
