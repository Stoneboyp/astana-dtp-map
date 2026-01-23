import { observer } from "mobx-react-lite";
import { mapUiStore } from "@shared/store/mapUiStore";
import { MAP_LAYERS_CONFIG } from "@shared/components/map/config/layers";
import { Car, Map as MapIcon, Layers } from "lucide-react";

export const LayerSwitcher = observer(() => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 10,
        display: "flex",
        gap: "8px",
        padding: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      {Object.values(MAP_LAYERS_CONFIG).map((layer) => {
        const isActive = mapUiStore.layersVisible[layer.id];

        // Функция для выбора иконки
        const renderIcon = () => {
          switch (layer.id) {
            case "cityArea":
              return <MapIcon size={20} strokeWidth={2.5} />;
            case "dtpPoints":
              return <Car size={20} strokeWidth={2.5} />;
            case "clusterMode":
              return <Layers size={20} strokeWidth={2.5} />;
            default:
              return null;
          }
        };

        return (
          <button
            key={layer.id}
            onClick={() => mapUiStore.toggleLayer(layer.id)}
            style={{
              border: "none",
              background: isActive ? "#e2e8f0" : "transparent",
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              color: isActive ? "#2563eb" : "#64748b",
            }}
            title={layer.label}
          >
            {renderIcon()}
          </button>
        );
      })}
    </div>
  );
});
