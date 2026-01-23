import { Map } from "@vis.gl/react-maplibre";
import type { MapRef } from "@vis.gl/react-maplibre";
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { MAP_SETTINGS } from "@shared/config";
import { MapLayers } from "@shared/components/map";
import { useMapClick } from "@shared/hooks/useMapClick";
import { LayerSwitcher } from "@shared/components/map";
import { MapPopups } from "@shared/components/map";
export const MapView = observer(() => {
  const mapRef = useRef<MapRef | null>(null);
  const { handleMapClick } = useMapClick(mapRef);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <LayerSwitcher />
      <Map
        ref={mapRef}
        initialViewState={MAP_SETTINGS.ASTANA_VIEW}
        mapStyle={MAP_SETTINGS.STYLE}
        style={{ width: "100%", height: "100%" }}
        interactiveLayerIds={["clusters", "unclustered-point"]}
        onClick={handleMapClick}
      >
        <MapPopups />
        <MapLayers />
      </Map>
    </div>
  );
});
