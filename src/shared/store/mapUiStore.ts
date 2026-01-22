import { makeAutoObservable } from "mobx";

export type SelectedDtpPoint = {
  id: number;
  coordinates: [number, number];
  properties?: any;
};

class MapUiStore {
  selectedPoint: SelectedDtpPoint | null = null;

  layersVisible = {
    dtpPoints: true,
    cityArea: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedPoint(point: SelectedDtpPoint) {
    this.selectedPoint = point;
  }

  clearSelectedPoint() {
    this.selectedPoint = null;
  }

  toggleLayer(layer: keyof typeof this.layersVisible) {
    this.layersVisible[layer] = !this.layersVisible[layer];
  }
}

export const mapUiStore = new MapUiStore();
