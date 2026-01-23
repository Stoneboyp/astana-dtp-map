import { Popup } from "@vis.gl/react-maplibre";
import { observer } from "mobx-react-lite";
import { mapUiStore } from "@shared/store/mapUiStore";
import { normalizeDtpData } from "@utils/normalize";

export const MapPopups = observer(() => {
  const { selectedPoint } = mapUiStore;

  if (!selectedPoint) return null;

  const dtp = normalizeDtpData(selectedPoint);

  return (
    <Popup
      longitude={dtp.coordinates[0]}
      latitude={dtp.coordinates[1]}
      anchor="bottom"
      offset={15}
      onClose={() => mapUiStore.clearSelectedPoint()}
      closeOnClick={false}
    >
      <div
        style={{
          color: "#1e293b",
          padding: "4px",
          fontSize: "13px",
          minWidth: "200px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "6px",
            marginBottom: "8px",
          }}
        >
          <span>№ {dtp.id}</span>
          <span style={{ color: "#2563eb" }}>{dtp.date}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {dtp.reason && (
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Причина ДТП
              </div>
              <div
                style={{
                  color: "#e11d48",
                  fontWeight: "500",
                  lineHeight: "1.3",
                }}
              >
                {dtp.reason}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Время
              </div>
              <div>{dtp.time}</div>
            </div>

            {dtp.surface && (
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    fontWeight: "600",
                  }}
                >
                  Покрытие
                </div>
                <div>{dtp.surface}</div>
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: "10px",
              color: "#94a3b8",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "6px",
              textAlign: "center",
            }}
          >
            {dtp.coordinates[1].toFixed(5)}, {dtp.coordinates[0].toFixed(5)}
          </div>
        </div>
      </div>
    </Popup>
  );
});
