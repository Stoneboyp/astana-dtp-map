import { observer } from "mobx-react-lite";
import { mapUiStore } from "@shared/store/mapUiStore";
import { MAP_LAYERS_CONFIG } from "@shared/components/map/config/layers";
import { Car, Map as MapIcon, Layers, RefreshCw } from "lucide-react";
import { useDtpPointsQuery } from "@shared/api/dtp";

export const LayerSwitcher = observer(() => {
  const { refetch, isFetching } = useDtpPointsQuery();
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          backdropFilter: "blur(4px)",
        }}
      >
        {Object.values(MAP_LAYERS_CONFIG).map((layer) => {
          const isActive = mapUiStore.layersVisible[layer.id];

          const renderIcon = () => {
            switch (layer.id) {
              case "cityArea":
                return <MapIcon size={18} />;
              case "dtpPoints":
                return <Car size={18} />;
              case "clusterMode":
                return <Layers size={18} />;
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
                color: isActive ? "#2563eb" : "#64748b",
                transition: "all 0.2s",
              }}
              title={layer.label}
            >
              {renderIcon()}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => refetch()}
        disabled={isFetching}
        style={{
          border: "none",
          width: "36px",
          height: "36px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isFetching ? "not-allowed" : "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          color: isFetching ? "#2563eb" : "#64748b",
          transition: "transform 0.2s active",
        }}
        title="Обновить данные"
      >
        <RefreshCw
          size={18}
          style={{
            animation: isFetching ? "spin 1s linear infinite" : "none",
            transition: "all 0.3s ease",
          }}
        />
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});
