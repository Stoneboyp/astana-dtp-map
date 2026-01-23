import {
  MAP_LAYERS_CONFIG,
  type LayerId,
} from "@shared/components/map/config/layers";
import { makeAutoObservable } from "mobx";

export type SelectedDtpPoint = {
  id: number;
  coordinates: [number, number];
  properties?: any;
};

class MapUiStore {
  selectedPoint: SelectedDtpPoint | null = null;

  layersVisible = Object.keys(MAP_LAYERS_CONFIG).reduce(
    (acc, key) => {
      acc[key as LayerId] = true;
      return acc;
    },
    {} as Record<LayerId, boolean>,
  );

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedPoint(point: SelectedDtpPoint) {
    this.selectedPoint = point;
  }

  clearSelectedPoint() {
    this.selectedPoint = null;
  }

  toggleLayer(layerId: LayerId) {
    this.layersVisible[layerId] = !this.layersVisible[layerId];
  }
}

export const mapUiStore = new MapUiStore();
