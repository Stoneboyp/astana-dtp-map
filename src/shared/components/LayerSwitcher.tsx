import { observer } from "mobx-react-lite";
import { mapUiStore } from "@shared/store/mapUiStore";
import { MAP_LAYERS_CONFIG } from "@shared/components/map/config/layers";

export const LayerSwitcher = observer(() => {
  return (
    <div className="layer-switcher">
      {Object.values(MAP_LAYERS_CONFIG).map((layer) => (
        <label
          key={layer.id}
          style={{ display: "flex", gap: "8px", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={mapUiStore.layersVisible[layer.id]}
            onChange={() => mapUiStore.toggleLayer(layer.id)}
          />
          <span>{layer.label}</span>
        </label>
      ))}
    </div>
  );
});
