import type { MapMouseEvent, MapRef } from "@vis.gl/react-maplibre";
import { GeoJSONSource } from "maplibre-gl";
import { mapUiStore } from "@shared/store/mapUiStore";

export const useMapClick = (mapRef: React.RefObject<MapRef | null>) => {
  const handleMapClick = async (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature) {
      mapUiStore.clearSelectedPoint();
      return;
    }

    if (feature.properties?.cluster) {
      const clusterId = feature.properties.cluster_id;
      const source = mapRef.current?.getSource("dtp-points") as GeoJSONSource;

      if (source) {
        try {
          const zoom = await source.getClusterExpansionZoom(clusterId);
          mapRef.current?.easeTo({
            center: (feature.geometry as any).coordinates,
            zoom: zoom + 0.5,
            duration: 500,
          });
        } catch (err) {
          console.error("Cluster zoom error:", err);
        }
      }
      return;
    }

    const id = feature.properties?.objectid || feature.properties?.id;
    const coords = (feature.geometry as any).coordinates as [number, number];

    if (id && coords) {
      mapUiStore.setSelectedPoint({
        id,
        coordinates: coords,
        properties: feature.properties,
      });

      mapRef.current?.easeTo({
        center: coords,
        duration: 300,
      });
    }
  };

  return { handleMapClick };
};
