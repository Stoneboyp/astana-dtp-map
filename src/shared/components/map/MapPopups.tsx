import { Popup } from "@vis.gl/react-maplibre";
import { observer } from "mobx-react-lite";
import { mapUiStore } from "@shared/store/mapUiStore";

export const MapPopups = observer(() => {
  const { selectedPoint } = mapUiStore;

  if (!selectedPoint) return null;

  const p = selectedPoint.properties;

  // Форматируем дату
  const formattedDate = p?.rta_date
    ? new Date(p.rta_date).toLocaleDateString("ru-RU")
    : "—";

  return (
    <Popup
      longitude={selectedPoint.coordinates[0]}
      latitude={selectedPoint.coordinates[1]}
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
        {/* Заголовок: Номер и Дата */}
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
          <span>№ {selectedPoint.id}</span>
          <span style={{ color: "#2563eb" }}>{formattedDate}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* 1. Вид нарушения/Причина */}
          {p?.fd1r09p1 && (
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
                {p.fd1r09p1}
              </div>
            </div>
          )}

          {/* 2. Время и условия дороги */}
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
              <div>{p?.fd1r05p1 || "—"}</div>
            </div>

            {p?.fd1r071p1 && (
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
                <div>{p.fd1r071p1}</div>
              </div>
            )}
          </div>

          {/* 3. Местоположение (кратко) */}
          <div
            style={{
              fontSize: "10px",
              color: "#94a3b8",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "6px",
              textAlign: "center",
            }}
          >
            {selectedPoint.coordinates[1].toFixed(5)},{" "}
            {selectedPoint.coordinates[0].toFixed(5)}
          </div>
        </div>
      </div>
    </Popup>
  );
});
