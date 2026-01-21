import { Map } from "@vis.gl/react-maplibre";
import type { MapRef } from "@vis.gl/react-maplibre";
import { useRef } from "react";

const ASTANA_VIEW = {
  longitude: 71.4304,
  latitude: 51.1284,
  zoom: 10,
};

export const MapView = () => {
  const mapRef = useRef<MapRef | null>(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={ASTANA_VIEW}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};
