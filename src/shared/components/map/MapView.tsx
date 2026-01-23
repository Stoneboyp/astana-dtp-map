import { Map } from "@vis.gl/react-maplibre";
import type { MapRef, MapMouseEvent } from "@vis.gl/react-maplibre";
import type { GeoJSONSource } from "maplibre-gl";
import { useRef } from "react";
import { observer } from "mobx-react-lite";

import { MAP_SETTINGS } from "@shared/config";
import { MapLayers } from "./MapLayers";
import { mapUiStore } from "@shared/store/mapUiStore";
import { useMapClick } from "@shared/hooks/useMapClick";

export const MapView = observer(() => {
  const mapRef = useRef<MapRef | null>(null);

  const { handleMapClick } = useMapClick(mapRef);

  return (
    <Map
      ref={mapRef}
      initialViewState={MAP_SETTINGS.ASTANA_VIEW}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: "100vw", height: "100vh" }}
      interactiveLayerIds={["clusters", "unclustered-point"]}
      onClick={handleMapClick}
      cursor="pointer"
    >
      <MapLayers />
    </Map>
  );
});
